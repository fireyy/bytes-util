// File size https://en.wikipedia.org/wiki/File_size
const str = '|K|M|G|T|P|E|Z|Y'
const units = str.split('|').map(s => `${s}B`) // ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
const regex = `^([0-9]+\\.{0,1}[0-9]{0,2})\\s*(?:(${str})B?)?$`
const unit = 1024

/**
 *  Parse a size given in kilo/mega/giga/tera/peta/exa/zetta/yotta byte string into a number of bytes
 *
 *  @param {String} size  The Size to convert
 *  @returns a number of bytes
 *
 *  @example
 *  parse('20MB')
 */
function parse (size: string): number | string {
  if (typeof size !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof size}: ${size}`)
  }

  const r = size
    .trim()
    .toUpperCase()
    .match(new RegExp(regex))

  if (!r) return 'N/A'

  return parseFloat(r[1]) * Math.pow(unit, units.indexOf(`${r[2] || ''}B`))
}

/**
 *  Convert bytes to a human readable string
 *
 *  @param {Number} bytes  The bytes number to convert
 *  @returns a human readable string
 *
 *  @example
 *  stringify(1538)
 */
function stringify (bytes: number) : string {
  if (!Number.isFinite(bytes)) {
    throw new TypeError(`Expected a finite number, got ${typeof bytes}: ${bytes}`)
  }

  const size = Math.abs(bytes)

  const e = Math.min(Math.floor(Math.log10(size) / 3 | 0), units.length - 1)

  return Math.sign(bytes) * Number((size / Math.pow(unit, e)).toPrecision(3)) + ' ' + units[e]
}

export default {
  parse,
  stringify
}
