import {Command, flags} from '@oclif/command'
import * as keytar from 'keytar'
import * as Listr from 'listr'

import keychain from '../keychain'
import authenticate from '../login/authenticate'
import * as Prompt from '../login/prompt'

async function chooseAccount(): Promise<{
  chosen: LoginCredentials;
  isNew?: boolean;
}> {
  const credentials = await keytar.findCredentials('br.com.getlabor')

  if (credentials === null || credentials.length === 0) {
    return {chosen: await Prompt.credentials()}
  }

  const credential = await Prompt.user(credentials)

  if (credential.chosen === null) {
    return {chosen: await Prompt.credentials(), isNew: true}
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
