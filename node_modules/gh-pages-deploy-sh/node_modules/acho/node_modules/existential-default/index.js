'use strict'

var exists = require('existential')
var _clone = require('lodash.clonedeep')
var _defaultsDeep = require('lodash.defaultsdeep')

function merge (x, y) {
  return _defaultsDeep(_clone(x), y)
}

function isObject (arg) {
  return typeof arg === 'object' && arg !== null
}

function resolveMerge (target, source) {
  if (!isObject(source)) return exists(target) ? target : source
  return merge(target, source)
}

module.exports = function () {
  var args = Array.prototype.slice.call(arguments)
  var result = resolveMerge(args.shift(), args.shift())
  while (args.length) result = resolveMerge(result, args.shift())
  return result
}
