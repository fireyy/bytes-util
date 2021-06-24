import bytesUtil from '../src'

const { parse: p, stringify: s } = bytesUtil

describe('throws on invalid input', () => {
  it('throws on invalid input', () => {
    // parse
    expect(() => p(NaN)).toThrow()
    expect(() => p(true)).toThrow()
    expect(() => p(Infinity)).toThrow()
    expect(() => p(-Infinity)).toThrow()
    expect(() => p(null)).toThrow()

    // stringify
    expect(() => s('')).toThrow()
    expect(() => s('1')).toThrow()
    expect(() => s(NaN)).toThrow()
    expect(() => s(true)).toThrow()
    expect(() => s(Infinity)).toThrow()
    expect(() => s(-Infinity)).toThrow()
    expect(() => s(null)).toThrow()
  })

  it('Parse a size given in kilo/mega/giga/tera/peta/exa/zetta/yotta byte into a number of bytes', () => {
    expect(p('0 B')).toEqual(0)
    expect(p('0.4 B')).toEqual(0.4)
    expect(p('0.7 B')).toEqual(0.7)
    expect(p('10 B')).toEqual(10)
    expect(p('10.1 B')).toEqual(10.1)
    expect(p('999 B')).toEqual(999)
    expect(p('1 KB')).toEqual(1024)
    expect(p('10 PB')).toEqual(11258999068426240)
    expect(p('1000000 YB')).toEqual(1.2089258196146292e+30)
  })

  it('converts bytes to human readable strings', () => {
    expect(s(0)).toEqual('0 B')
    expect(s(0.4)).toEqual('0.4 B')
    expect(s(0.7)).toEqual('0.7 B')
    expect(s(10)).toEqual('10 B')
    expect(s(10.1)).toEqual('10.1 B')
    expect(s(999)).toEqual('999 B')
    expect(s(1024)).toEqual('1 KB')
    expect(s(11258999068426240)).toEqual('10 PB')
    expect(s(1.2089258196146292e+30)).toEqual('1000000 YB')
  })

  it('supports negative number', () => {
    expect(s(-0.4)).toEqual('-0.4 B')
    expect(s(-0.7)).toEqual('-0.7 B')
    expect(s(-10.1)).toEqual('-10.1 B')
    expect(s(-999)).toEqual('-999 B')
    expect(s(-1001)).toEqual('-0.978 KB')
  })
})
