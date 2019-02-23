import login from '../../__helpers__/login'
import runCommand from '../../__helpers__/run-command'

jest.mock('../../src/config')

describe('logout', () => {
  let logs: string[] = []

  beforeEach(async () => {
    logs = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => !!logs.push(val))
  })

  afterEach(jest.resetAllMocks)

  it('runs the logout command', async () => {
    await runCommand(['logout'])

    expect(logs).toContainEqual(
      expect.stringContaining('you need to login first'),
    )
  })

  it('removes credentials when logged', async () => {
    await login()
    await runCommand(['logout'])
    expect(logs).toContainEqual(
      expect.stringContaining('Removed credentials from memory.'),
    )
  })

  // TODO: add test that ensures the login isn't remembered after asking to forget it
})
