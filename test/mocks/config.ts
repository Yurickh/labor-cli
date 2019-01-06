import { SinonSandbox } from 'sinon'

import overrideWithPartial from '../../src/common/override-with-partial'
import Config, { ConfigType } from '../../src/config'

export default function mockConfig(sandbox: SinonSandbox) {
  let current: ConfigType | null = null

  sandbox.stub(Config, 'get').callsFake(() => current)
  sandbox.stub(Config, 'set').callsFake(user => {
    if (user !== null) {
      current = overrideWithPartial(current, user)
    }

    return current
  })
  sandbox.stub(Config, 'remove').callsFake(() => {
    if (current !== null) {
      current = null
      return true
    } else {
      return false
    }
  })
}
