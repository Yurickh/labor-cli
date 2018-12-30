import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import {validate} from 'isemail'
import * as Listr from 'listr'

import baseAPI from '../base-api'

type LoginCredentials = { email: string; password: string }

async function authenticate(data: LoginCredentials) {
  const result = await baseAPI('auth/sign_in').post(data)

  if (!result.success) {
    throw new Error(result.errors[0])
  }

  return result
}

function promptLoginData(): Promise<LoginCredentials> {
  return inquirer.prompt([
    {
      name: 'email',
      message: 'Email:',
      type: 'input',
      validate: email => validate(email) || 'Please provide a valid email',
    },
    {
      name: 'password',
      message: 'Password:',
      type: 'password',
    },
  ])
}

function taskList(data: LoginCredentials) {
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
  ])
}

export default class Login extends Command {
  static description = 'Enter your credentials to start using Labor.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    try {
      const result = await taskList(await promptLoginData()).run()
      this.log(result)
    } catch (_exception) {
      this.exit(1)
    }
  }
}
