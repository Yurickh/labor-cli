import { Project, User } from '../types/common'
import { AuthCredentials } from '../types/login'

import overrideWithPartial from '../common/override-with-partial'

export interface ConfigType {
  user: User
  auth: AuthCredentials
  projects?: Project[]
}

let current: ConfigType | null = null

export function get(): ConfigType | null {
  return current
}

export function set(user: ConfigType | null): ConfigType | null {
  if (user !== null) {
    current = overrideWithPartial(current, user)
  }

  return current
}

export function remove(): boolean {
  if (current !== null) {
    current = null
    return true
  } else {
    return false
  }
}

export default {
  get,
  set,
  remove,
}
