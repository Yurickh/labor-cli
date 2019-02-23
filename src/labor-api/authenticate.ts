import baseAPI from '../common/base-api'
import { User } from '../types/common'

import { LoginCredentials } from '../types/login'

export default function authenticate(data: LoginCredentials): Promise<User> {
  return baseAPI<{ data: User }>('auth/sign_in')
    .post({
      email: data.account,
      password: data.password,
    })
    .then(result => {
      if (result.success !== undefined) {
        throw new Error(result.errors[0])
      }

      return result.data
    })
}
