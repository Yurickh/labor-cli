import * as fs from 'fs'

export type ConfigType = {
  currentUser: string;
  accessToken: string;
}

type PartialConfigType = {
  currentUser?: string;
  accessToken?: string;
} | null

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

export function set(config: PartialConfigType) {
  if (config === null) return

  fs.mkdirSync(rootPath, { recursive: true })
  fs.writeFileSync(
    `${rootPath}/config.json`,
    JSON.stringify({ ...get(), ...config }, null, 2),
    'utf8',
  )
}

export default {
  get,
  set,
}
