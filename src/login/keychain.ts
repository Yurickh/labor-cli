import * as os from 'os'

export default function keychain() {
  switch (os.platform()) {
    case 'darwin':
      return 'keychain'
    case 'win32':
      return 'credential vault'
    default:
      return 'secret service'
  }
}
