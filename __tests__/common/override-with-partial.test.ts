import overrideWithPartial from '../../src/common/override-with-partial'

type Base = { a: number; b: number } | null
type Part = Partial<Base> | null

describe('overrideWithPartial', () => {
  it('overrides the values specified in partial', () => {
    const base: Base = { a: 1, b: 2 }
    const override: Part = { b: 3 }

    expect(overrideWithPartial(base, override)).toEqual({
      a: 1,
      b: 3,
    })
  })

  it('ignores undefined values', () => {
    const base: Base = { a: 1, b: 2 }
    const override: Part = { a: undefined, b: 3 }

    expect(overrideWithPartial(base, override)).toEqual({
      a: 1,
      b: 3,
    })
  })

  it('is partial when base is null', () => {
    const base: Base = null
    const override: Part = { b: 3 }

    expect(overrideWithPartial(base, override)).toEqual(override)
  })

  it('is base when override is null', () => {
    const base: Base = { a: 1, b: 2 }
    const override: Part = null

    expect(overrideWithPartial(base, override)).toEqual(base)
  })
})
