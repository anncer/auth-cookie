

/* eslint-disable no-var */
export default function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i]
    for (var key in source) {
      target[key] = source[key]
    }
  }
  return target
}
/* eslint-enable no-var */