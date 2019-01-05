import * as fs from 'fs'

import { Project, User } from './common/types'
import { AuthCredentials } from './login/types'
import overrideWithPartial from './common/override-with-partial'

export type ConfigType = {
  user: User;
  auth: AuthCredentials;
  projects?: Project[];
}

export const rootPath = '/usr/local/lib/labor-cli'

export function get(): ConfigType | null {
  try {
    const contentAsString = fs.readFileSync(`${rootPath}/config.json`, 'utf8')
    return JSON.parse(contentAsString)
  } catch (exception) {
    const [type] = exception.message.split(': ')

    // swallog enoent exceptions
    if (type !== 'ENOENT') {
      throw exception
    }

    return null
  }
}

export function set(config: Partial<ConfigType> | null): ConfigType | null {
  if (config === null) return get()
  const merged = overrideWithPartial(get(), config)

  fs.mkdirSync(rootPath, { recursive: true })
  fs.writeFileSync(
    `${rootPath}/config.json`,
    JSON.stringify(merged, null, 2),
    'utf8',
  )

  return merged
}

export function remove() {
  fs.unlinkSync(`${rootPath}/config.json`)
}

export default {
  get,
  set,
  remove,
}
