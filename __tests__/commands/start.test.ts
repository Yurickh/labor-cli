import login from '../../__helpers__/login'
import runCommand from '../../__helpers__/run-command'

jest.mock('../../src/config')

describe('login', () => {
  let logs: string[] = []

  beforeEach(() => {
    logs = []
    jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(val => !!logs.push(val))
  })

  afterEach(jest.resetAllMocks)

  it('complains about not being logged', async () => {
    const { code } = await runCommand(['start'])

    expect(code).toBe(1)
    expect(logs).toContainEqual(
      expect.stringContaining(
        'You need to be logged in order to execute this action.',
      ),
    )
  })

  it('properly starts a new task', async () => {
    await login()
    const { code } = await runCommand(['start', '-y'])

    expect(code).toBe(0)
    expect(logs).toContainEqual(
      expect.stringContaining('Your task just started'),
    )
  })
})
