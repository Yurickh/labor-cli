import * as fs from 'fs'
import { expect } from 'chai'
import Config, { ConfigType, rootPath } from '../src/config'

describe('Config', () => {
  let originalConfig: ConfigType | null

  beforeEach(() => {
    originalConfig = Config.get()
  })

  afterEach(() => {
    Config.set(originalConfig)
  })

  it('saves the user persistently', () => {
    const config = {
      currentUser: 'yurick@email.com',
      accessToken: 'access-token',
    }
    Config.set(config)
    expect(Config.get()).to.deep.equal(config)
  })

  it("doesn't break when running on an empty canvas", () => {
    fs.unlinkSync(`${rootPath}/config.json`)
    fs.rmdirSync(rootPath)

    const config = {
      currentUser: 'maria@email.com',
      accessToken: 'safe-access',
    }

    expect(Config.get()).to.be.null
    Config.set(config)
    expect(Config.get()).to.deep.equal(config)
  })

  it('is noop when receiving null', () => {
    const config = {
      currentUser: 'maria@email.com',
      accessToken: 'safe-space',
    }
    Config.set(config)
    Config.set(null)
    expect(Config.get()).to.deep.equal(config)
  })
})
