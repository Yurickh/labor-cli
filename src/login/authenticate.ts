import baseAPI from '../common/base-api'

import { AuthCredentials, LoginCredentials } from '../types/login'
import { User } from '../types/common'

export default async function authenticate(
  data: LoginCredentials,
): Promise<{ auth: AuthCredentials; data: User }> {
  const response = await baseAPI('auth/sign_in').post({
    email: data.account,
    password: data.password,
  })

  const result = await response.json()

  if (result.errors) {
    throw new Error(result.errors[0])
  }

  return {
    auth: {
      'token-type': response.headers.get('token-type') || '',
      'access-token': response.headers.get('access-token') || '',
      client: response.headers.get('client') || '',
      uid: response.headers.get('uid') || '',
    },
    data: result.data,
  }
}
