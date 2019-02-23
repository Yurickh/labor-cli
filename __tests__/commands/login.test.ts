import * as nock from 'nock'
import { setPassword } from 'keytar'

import { root } from '../../src/common/base-api'
import runCommand from '../../__helpers__/run-command'

jest.mock('../../src/config')

describe('login', () => {
  let logs: string[] = []

  beforeEach(() => {
    logs = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => !!logs.push(val))
    console.log = jest.fn()
  })

  afterEach(jest.resetAllMocks)

  const pumblingCommand = ['login', '-a', 'yurick@email.com', '-p', 'saf3pa5s']
  const porcelainCommand = ['login']

  const succeedRequest = (): void =>
    void nock(root)
      .post('/auth/sign_in')
      .reply(
        200,
        {},
        {
          'token-type': 'Bearer',
          'access-token': 'ace5s-70ken',
        },
      )

  const failRequest = (): void =>
    void nock(root)
      .post('/auth/sign_in')
      .reply(401, { success: false, errors: ['Invalid email'] })

  it('logs the user directly on pumbling mode', async () => {
    succeedRequest()
    await runCommand(pumblingCommand)

    expect(logs).toContainEqual(
      expect.stringContaining('Successfully logged in as yurick@email.com'),
    )
  })

  it('shows error message when login is invalid', async () => {
    failRequest()
    const { code } = await runCommand(pumblingCommand)

    expect(code).toBe(1)
    expect(logs).toContainEqual(
      expect.stringContaining(
        'Failed authentication with Error: Invalid email',
      ),
    )
  })

  it('properly logs the user on porcelain mode', async () => {
    succeedRequest()
    const { code } = await runCommand(porcelainCommand)

    expect(code).toBe(0)
    expect(logs).toContainEqual(
      expect.stringContaining("✨ You've been successfully logged in."),
    )
  })

  it('enables choosing a previous option', async () => {
    succeedRequest()
    await setPassword('', 'yurick@email.com', 'saf3pa5s')
    const { code } = await runCommand(porcelainCommand)

    expect(code).toBe(0)
    expect(logs).toContainEqual(
      expect.stringContaining("✨ You've been successfully logged in."),
    )
  })
})
