import baseAPI from '../base-api'

import {LoginCredentials} from './types'

export default async function authenticate(data: LoginCredentials) {
  const result = await baseAPI('auth/sign_in').post({
    email: data.account,
    password: data.password,
  })

  if (result.errors) {
    throw new Error(result.errors[0])
  }

  return result
}
