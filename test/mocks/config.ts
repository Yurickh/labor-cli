import { SinonSandbox } from 'sinon'

import Config, { ConfigType } from '../../src/config'

export default function mockConfig(sandbox: SinonSandbox) {
  let current: ConfigType

  sandbox.stub(Config, 'get').callsFake(() => current || null)
  sandbox
    .stub(Config, 'set')
    .callsFake(user => user !== null && (current = { ...current, ...user }))
}
