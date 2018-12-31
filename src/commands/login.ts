import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import {validate} from 'isemail'
import * as keytar from 'keytar'
import * as Listr from 'listr'

import baseAPI from '../base-api'
import keychain from '../keychain'

type LoginCredentials = { account: string; password: string }

async function authenticate(data: LoginCredentials) {
  const result = await baseAPI('auth/sign_in').post({
    email: data.account,
    password: data.password,
  })

  if (result.errors) {
    throw new Error(result.errors[0])
  }

  return result
}

function promptUser(
  credentials: Array<LoginCredentials>,
): Promise<{ chosen: LoginCredentials }> {
  return inquirer.prompt([
    {
      name: 'chosen',
      message: 'Which account do you want to use to login with getlabor.com?',
      type: 'list',
      choices: [
        ...credentials.map(credential => ({
          name: credential.account,
          value: credential,
        })),
        {
          name: 'Login with another account',
          value: null,
        },
      ],
    },
  ])
}

function promptLoginData(): Promise<LoginCredentials> {
  return inquirer.prompt([
    {
      name: 'account',
      message: 'Email:',
      type: 'input',
      validate: account => validate(account) || 'Please provide a valid email',
    },
    {
      name: 'password',
      message: 'Password:',
      type: 'password',
    },
  ])
}

async function chooseAccount(): Promise<{
  chosen: LoginCredentials;
  isNew?: boolean;
}> {
  const credentials = await keytar.findCredentials('br.com.getlabor')

  if (credentials === null || credentials.length === 0) {
    return {chosen: await promptLoginData()}
  }

  const credential = await promptUser(credentials)

  if (credential.chosen === null) {
    return {chosen: await promptLoginData(), isNew: true}
  }

  return credential
}

function orchestratePorcelain(data: LoginCredentials, isNew?: boolean) {
  return new Listr([
    {
      title: 'Authenticating',
      task: async ctx => {
        try {
          const result = await authenticate(data)
          ctx.result = result
          return result
        } catch (exception) {
          ctx.error = exception
          return Promise.reject(exception)
        }
      },
    },
    {
      title: `Saving account on ${keychain()}`,
      task: () =>
        keytar.setPassword('br.com.getlabor', data.account, data.password),
      enabled: () => isNew || false,
    },
  ])
}

export default class Login extends Command {
  static description = 'Enter your credentials to start using Labor.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    try {
      const {chosen, isNew} = await chooseAccount()
      await orchestratePorcelain(chosen, isNew).run()
      this.log(
        "✨ You've been successfully logged in. You can now use all labor's features",
      )
    } catch (exception) {
      this.exit(1)
    }
  }
}
