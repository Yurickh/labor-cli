import * as fs from 'fs'
import { expect } from 'chai'
import currentUser, { rootPath } from '../../src/login/current-user'

describe('currentUser', () => {
  let originalUser: string

  beforeEach(() => {
    currentUser.get()
  })

  afterEach(() => {
    currentUser.set(originalUser)
  })

  it('saves the user persistently', () => {
    currentUser.set('yurick@email.com')
    expect(currentUser.get()).to.equal('yurick@email.com')
  })

  it("doesn't break when running on an empty canvas", () => {
    fs.unlinkSync(`${rootPath}/config.json`)
    fs.rmdirSync(rootPath)

    expect(currentUser.get()).to.be.undefined
    currentUser.set('maria@email.com')
    expect(currentUser.get()).to.equal('maria@email.com')
  })
})
