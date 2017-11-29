import test from 'ava'
import bytesUtil from '..'

const { parse: p, stringify: s } = bytesUtil

test('throws on invalid input', t => {
  // parse
	t.throws(() => p(NaN))
	t.throws(() => p(true))
	t.throws(() => p(Infinity))
	t.throws(() => p(-Infinity))
	t.throws(() => p(null))

  // stringify
	t.throws(() => s(''))
	t.throws(() => s('1'))
	t.throws(() => s(NaN))
	t.throws(() => s(true))
	t.throws(() => s(Infinity))
	t.throws(() => s(-Infinity))
	t.throws(() => s(null))
})

test('Parse a size given in kilo/mega/giga/tera/peta/exa/zetta/yotta byte into a number of bytes', t => {
	t.is(p('0 B'), 0)
	t.is(p('0.4 B'), 0.4)
	t.is(p('0.7 B'), 0.7)
	t.is(p('10 B'), 10)
	t.is(p('10.1 B'), 10.1)
	t.is(p('999 B'), 999)
	t.is(p('1 KB'), 1024)
	t.is(p('10 PB'), 11258999068426240)
	t.is(p('1000000 YB'), 1.2089258196146292e+30)
})

test('converts bytes to human readable strings', t => {
	t.is(s(0), '0 B')
	t.is(s(0.4), '0.4 B')
	t.is(s(0.7), '0.7 B')
	t.is(s(10), '10 B')
	t.is(s(10.1), '10.1 B')
	t.is(s(999), '999 B')
	t.is(s(1024), '1 KB')
	t.is(s(11258999068426240), '10 PB')
	t.is(s(1.2089258196146292e+30), '1000000 YB')
})

test('supports negative number', t => {
	t.is(s(-0.4), '-0.4 B')
	t.is(s(-0.7), '-0.7 B')
	t.is(s(-10.1), '-10.1 B')
	t.is(s(-999), '-999 B')
	t.is(s(-1001), '-0.978 KB')
})
