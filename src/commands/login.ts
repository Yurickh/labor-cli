import { Command, flags } from '@oclif/command'
import * as keytar from 'keytar'
import * as Listr from 'listr'

import authenticate from '../login/authenticate'
import keychain from '../login/keychain'
import * as Prompt from '../login/prompt'
import Config from '../config'
import { LoginCredentials } from '../login/types'

async function chooseAccount(): Promise<{
  chosen: LoginCredentials;
  isNew?: boolean;
}> {
  const credentials = await keytar.findCredentials('br.com.getlabor')

  if (credentials.length === 0) {
    return { chosen: await Prompt.credentials() }
  }

  const { chosen } = await Prompt.user(credentials)

  if (chosen === null) {
    return { chosen: await Prompt.credentials(), isNew: true }
  }

  return { chosen }
}

function saveToKeychain(data: LoginCredentials) {
  return keytar.setPassword('br.com.getlabor', data.account, data.password)
}

function orchestratePorcelain(data: LoginCredentials, isNew?: boolean) {
  return new Listr([
    {
      title: 'Authenticating',
      task: async ctx => {
        try {
          const config = await authenticate(data)
          ctx.config = config
          return config
        } catch (exception) {
          ctx.error = exception
          return Promise.reject(exception)
        }
      },
    },
    {
      title: 'Saving account details',
      task: ctx => Config.set(ctx.config),
    },
    {
      title: `Saving account on ${keychain()}`,
      task: () => saveToKeychain(data),
      enabled: () => isNew || false,
    },
  ]).run()
}

async function orchestratePumbler(
  log: typeof console.log,
  data: LoginCredentials,
) {
  try {
    log('Authenticating...')
    const config = await authenticate(data)

    log('Saving account details...')
    Config.set(config)
    await saveToKeychain(data)

    log(`Successfully logged in as ${data.account}!`)
  } catch (exception) {
    log(`Failed authentication with ${exception}`)
    // rethrow exception so we exit with non-zero code
    throw exception
  }
}

export default class Login extends Command {
  static description = 'Enter your credentials to start using Labor.'

  static flags = {
    help: flags.help({ char: 'h' }),
    account: flags.string({
      char: 'a',
      dependsOn: ['password'],
      description:
        'Optional email. Pass only if you need to call this command programatically.',
    }),
    password: flags.string({
      char: 'p',
      dependsOn: ['account'],
      description:
        'Optional password. Pass only if you need to call this command programatically.',
    }),
  }

  async run() {
    try {
      const { flags } = this.parse(Login)
      const { account, password } = flags

      // pumbling mode
      if (account && password) {
        await orchestratePumbler(this.log, { account, password })
        return true
      }

      // porcelain mode
      const { chosen, isNew } = await chooseAccount()
      await orchestratePorcelain(chosen, isNew)
      this.log("✨ You've been successfully logged in.")
    } catch (exception) {
      // Uncomment next line to have meaningful errors for debugging, but don't leave it uncommented
      // this.error(exception)
      this.exit(1)
    }
  }
}
