import * as keytar from 'keytar'

import Config from '../config'
import authenticate from '../labor-api/authenticate'

export default async function refreshAuthTokens() {
  const config = Config.get()
  if (config === null) return null

  const account = config.auth.uid
  const password = await keytar.getPassword('br.com.getlabor', account)
  if (password === null) return null

  return authenticate({ account, password })
}
