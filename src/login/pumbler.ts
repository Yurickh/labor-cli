import Config from '../config'

import { save as saveToKeychain } from './keychain'
import authenticate from './authenticate'

import { LoginCredentials } from '../types/login'

export default async function orchestratePumbler(
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
