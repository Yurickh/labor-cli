import * as keytar from 'keytar'
import {SinonSandbox} from 'sinon'

import {LoginCredentials} from '../../src/login/types'

export default function mockKeytar(sandbox: SinonSandbox) {
  const keychain: Array<LoginCredentials> = []

  sandbox
    .stub(keytar, 'findCredentials')
    .callsFake(() => Promise.resolve(keychain))
  sandbox
    .stub(keytar, 'setPassword')
    .callsFake(async (_domain, account, password) => {
      keychain.push({account, password})
    })

  return keychain
}
