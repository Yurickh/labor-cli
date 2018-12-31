import {expect, test} from '@oclif/test'

import {root} from '../../src/base-api'

describe('login', () => {
  test
    .nock(root, api => api.post('/auth/sign_in').reply(200, {}))
    .stdout()
    .command([
      'login',
      '--account',
      'yurick@email.com',
      '--password',
      'saf3pa5s',
    ])
    .it('logs the user directly on pumbling mode', ctx => {
      expect(ctx.stdout).to.contain(
        'Successfully logged in as yurick@email.com',
      )
    })

  test
    .nock(root, api =>
      api
        .post('/auth/sign_in')
        .reply(401, {success: false, errors: ['Invalid email']}),
    )
    .stdout()
    .command([
      'login',
      '--account',
      'yurick@email.com',
      '--password',
      'saf3pa5s',
    ])
    .exit(1)
    .it('shows error message when login is invalid', ctx => {
      expect(ctx.stdout).to.contain(
        'Failed authentication with Error: Invalid email',
      )
    })
})
