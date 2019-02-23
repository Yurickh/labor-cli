import * as keytar from 'keytar'

import Config from '../config'
import authenticate from '../labor-api/authenticate'

import { User } from '../types/common'

export default async function refreshAuthTokens(): Promise<User | null> {
  const config = Config.get()
  if (config === null) return null

  const account = config.auth.uid
  const password = await keytar.getPassword('br.com.getlabor', account)
  if (password === null) return null

  return authenticate({ account, password })
}
