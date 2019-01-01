import baseAPI from '../base-api'

import { LoginCredentials } from './types'

export default async function authenticate(data: LoginCredentials) {
  const response = await baseAPI('auth/sign_in').post({
    email: data.account,
    password: data.password,
  })

  const result = await response.json()

  if (result.errors) {
    throw new Error(result.errors[0])
  }

  return [
    response.headers.get('token-type'),
    response.headers.get('access-token'),
  ].join(' ')
}
