import { expect } from 'chai'
import cleanObject from '../../src/util/clean-object'

describe('cleanObject', () => {
  it('removes all undefined-valued attributes of the given object', () => {
    expect(
      Object.keys(cleanObject({ myundef: undefined, mydef: 3 })),
    ).not.to.contain('myundef')
  })

  it('leaves all non-undefined values intact', () => {
    const original = {
      string: 'an example of string',
      object: {
        undef: undefined,
        def: 'defined',
      },
      number: 4,
      array: [],
      populatedArray: [1, 2, 'tré'],
    }

    expect(cleanObject(original)).to.deep.equal(original)
  })
})
