import type { CookieProps } from './types'

export const __isObject = function(obj: any) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export const __isCache = function(str: any): boolean {
  return ["localStorage", "sessionStorage", "cookie"].includes(str)
}

export const __assign = function (target: CookieProps, ...args: CookieProps[]) {
  for (let i = 0; i < args.length; i++) {
    const source = args[i]
    for (let key in source) {
      target[key] = source[key]
    }
  }
  return target
}
