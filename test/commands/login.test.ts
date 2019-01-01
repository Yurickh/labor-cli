import {expect, test} from '@oclif/test'
import * as sinon from 'sinon'

import {root} from '../../src/base-api'
import mockInquirer from '../mocks/inquirer'
import mockKeytar from '../mocks/keytar'

describe('login', () => {
  const testSuccess = test.nock(root, api =>
    api.post('/auth/sign_in').reply(200, {}),
  )
  const testFailed = test.nock(root, api =>
    api
      .post('/auth/sign_in')
      .reply(401, {success: false, errors: ['Invalid email']}),
  )

  const pumblingCommand = ['login', '-a', 'yurick@email.com', '-p', 'saf3pa5s']
  const porcelainCommand = ['login']

  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    mockKeytar(sandbox)
    mockInquirer(sandbox)
  })

  afterEach(() => {
    sandbox.restore()
  })

  testSuccess
    .stdout()
    .command(pumblingCommand)
    .it('logs the user directly on pumbling mode', ctx => {
      expect(ctx.stdout).to.contain(
        'Successfully logged in as yurick@email.com',
      )
    })

  testFailed
    .stdout()
    .command(pumblingCommand)
    .exit(1)
    .it('shows error message when login is invalid', ctx => {
      expect(ctx.stdout).to.contain(
        'Failed authentication with Error: Invalid email',
      )
    })

  testSuccess
    .stdout()
    .command(porcelainCommand)
    .it('properly logs the user on porcelain mode', ctx => {
      expect(ctx.stdout).to.contain("✨ You've been successfully logged in.")
    })
})
