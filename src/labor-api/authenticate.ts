import baseAPI from '../common/base-api'
import { User } from '../types/common'

import { LoginCredentials } from '../types/login'

type Error = {
  success: false;
  errors: string[];
}

type Success = {
  success: undefined;
  data: User;
}

export default function authenticate(data: LoginCredentials): Promise<User> {
  return baseAPI('auth/sign_in')
    .post({
      email: data.account,
      password: data.password,
    })
    .then((result: Error | Success) => {
      if (result.success !== undefined) {
        throw new Error(result.errors[0])
      }

      return result.data
    })
}
