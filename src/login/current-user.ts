import * as fs from 'fs'

export const rootPath = '/usr/local/lib/labor-cli'

const baseConfig = (user: string) => `{
  "currentUser": "${user}"
}`

export function get() {
  try {
    const contentAsString = fs.readFileSync(`${rootPath}/config.json`, 'utf8')
    return JSON.parse(contentAsString).currentUser
  } catch (exception) {
    const [type] = exception.message.split(': ')

    // swallog enoent exceptions and just return undefined
    if (type !== 'ENOENT') {
      throw exception
    }
  }
}

export function set(user: string) {
  fs.mkdirSync(rootPath, { recursive: true })
  fs.writeFileSync(`${rootPath}/config.json`, baseConfig(user), 'utf8')
}

export default {
  get,
  set,
}
