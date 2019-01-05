import * as Listr from 'listr'
import * as keytar from 'keytar'

import authenticate from '../login/authenticate'
import Keychain from './keychain'
import * as Prompt from './prompt'

import Config from '../config'

import { LoginCredentials } from '../types/login'

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

export default async function orchestratePorcelain(log: typeof console.log) {
  const { chosen: data, isNew } = await chooseAccount()
  await new Listr([
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
      task: async ctx => Config.set(ctx.config),
    },
    {
      title: `Saving account on ${Keychain.name()}`,
      task: () => Keychain.save(data),
      enabled: () => isNew || false,
    },
  ]).run()
  log("✨ You've been successfully logged in.")
}
