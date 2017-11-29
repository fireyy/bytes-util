// File size https://en.wikipedia.org/wiki/File_size
var str = "|K|M|G|T|P|E|Z|Y";
var units = str.split("|").map(function (s) { return (s + "B"); }); // ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
var regex = "^([0-9]+\\.{0,1}[0-9]{0,2})\\s*(?:(" + str + ")B?)?$";
var unit = 1024;

/**
 *  Parse a size given in kilo/mega/giga/tera/peta/exa/zetta/yotta byte string into a number of bytes
 *
 *  @param {String} size  The Size to convert
 *  @returns a number of bytes
 *
 *  @example
 *  parse("20MB")
 */
function parse (size) {
  if (typeof size !== "string") {
    throw new TypeError(("Expected a string, got " + (typeof size) + ": " + size))
  }

  var r = size
    .trim()
    .toUpperCase()
    .match(new RegExp(regex));

  if (!r) { return "N/A" }

  return r[1] * Math.pow(unit, units.indexOf(((r[2] || "") + "B")))
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
function stringify (bytes) {
  if (!Number.isFinite(bytes)) {
    throw new TypeError(("Expected a finite number, got " + (typeof bytes) + ": " + bytes))
  }

  var size = Math.abs(bytes);

  var e = Math.min(Math.floor(Math.log10(size) / 3 | 0), units.length - 1);

  return Math.sign(bytes) * Number((size / Math.pow(unit, e)).toPrecision(3)) + " " + units[e]
}

var index = {
  parse: parse,
  stringify: stringify
};

export default index;
