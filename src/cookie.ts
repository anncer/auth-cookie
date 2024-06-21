import type { CookieProps } from './types'
import converter from './converter'

export const __setCookie = function (key: string, value: any, attributes: CookieProps) {

    if (typeof document === 'undefined') {
      return
    }

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5)
    }

    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString()
    }

    let stringifiedAttributes = ''

    for (let attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName

      if (attributes[attributeName] === true) {
        continue
      }
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0]
    }

    const _value = converter.write(value)

    return (document.cookie =
      key + '=' +_value + stringifiedAttributes)
}

export const __getCookie = function (key: string) {
  if (typeof document === 'undefined' || (arguments.length && !key)) {
    return
  }
  const cookies = document.cookie ? document.cookie.split('; ') : []
  const jar:any = {}

  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split('=')
    const value = parts.slice(1).join('=')

    try {
      const found = decodeURIComponent(parts[0])
      jar[found] = converter.read(value)

      if (key === found) {
        break
      }
    } catch (e) { }
  }
  return key ? jar[key] : jar
}

export const __clearCookie = function () {
  if (document && document.cookie) { return }
  document.cookie
    .split(";")
    .forEach(
      (cookie) =>
        (document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
    );
}
