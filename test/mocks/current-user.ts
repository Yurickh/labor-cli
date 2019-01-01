import {SinonSandbox} from 'sinon'

import currentUser from '../../src/login/current-user'

export default function mockCurrentUser(sandbox: SinonSandbox) {
  let current: string

  sandbox.stub(currentUser, 'get').callsFake(() => current)
  sandbox.stub(currentUser, 'set').callsFake(user => (current = user))
}
