import { expect } from 'chai'
import Config, { ConfigType } from '../src/config'

describe('Config', () => {
  let originalConfig: ConfigType | null

  beforeEach(() => {
    originalConfig = Config.get()
    Config.remove()
  })

  afterEach(() => {
    Config.set(originalConfig)
  })

  it('saves the user persistently', () => {
    const config = {
      auth: {
        uid: 'yurick@email.com',
        client: 'client',
        'access-token': 'access-token',
        'token-type': 'Bearer',
      },
    }
    Config.set(config)
    expect(Config.get()).to.deep.equal(config)
  })

  it("doesn't break when running on an empty canvas", () => {
    const config = {
      auth: {
        uid: 'maria@email.com',
        client: 'client',
        'access-token': 'safe-access',
        'token-type': 'Bearer',
      },
    }

    expect(Config.get()).to.be.null
    Config.set(config)
    expect(Config.get()).to.deep.equal(config)
  })

  it('is noop when receiving null', () => {
    const config = {
      auth: {
        uid: 'maria@email.com',
        client: 'client',
        'access-token': 'safe-access',
        'token-type': 'Bearer',
      },
    }
    Config.set(config)
    Config.set(null)
    expect(Config.get()).to.deep.equal(config)
  })
})
