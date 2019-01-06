import { expect, test } from '@oclif/test'
import * as sinon from 'sinon'

import mockConfig from '../mocks/config'
import login from '../helpers/login'

describe('logout', () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    mockConfig(sandbox)
  })

  afterEach(() => {
    sandbox.restore()
  })

  test
    .stdout()
    .command(['logout'])
    .it('complains when not logged', ctx => {
      expect(ctx.stdout).to.contain('you need to login first')
    })

  test
    .stdout()
    .do(login)
    .command(['logout'])
    .it('removes credentials when logged', ctx => {
      expect(ctx.stdout).to.contain('Removed credentials from memory.')
    })
})
