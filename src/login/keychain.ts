import * as os from 'os'
import * as keytar from 'keytar'
import { LoginCredentials } from '../types/login'

type KeyChain = 'keychain' | 'credential vault' | 'secret service'

export function name(): KeyChain {
  switch (os.platform()) {
    case 'darwin':
      return 'keychain'
    case 'win32':
      return 'credential vault'
    default:
      return 'secret service'
  }
}

export function save(data: LoginCredentials): Promise<void> {
  return keytar.setPassword('br.com.getlabor', data.account, data.password)
}

export default {
  name,
  save,
}
