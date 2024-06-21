import {__assign, __isCache, __isObject} from './utils'
import type { LocalParams, CookieProps } from './types'
import { __setStorage, __getStorage, __clearStorage, __removeStorage } from './storage';
import {__setCookie, __getCookie, __clearCookie} from './cookie'

class LocalCache {

  defaultType : LocalParams;
  defaultAttrs: CookieProps;

  constructor() {
    this.defaultType = 'cookie'
    this.defaultAttrs = {
      path: "/"
    }
  }

  // 获取需要更改的缓存类型
  private getType (t1: any): LocalParams {
    if (t1 && __isCache(t1)) {
      return t1
    }
    return this.defaultType
  }

  // 获取缓存的设置参数
  private getAttrs (t1: any): CookieProps {
    return __isObject(t1)
        ? t1
        : this.defaultAttrs
  }

  set(name: string | number, value: any, type?: LocalParams, attrs?: CookieProps ) {

    if (!name) {return}

    let key = name && typeof name === "string" ? name : String(name)

    key = encodeURIComponent(key)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape)

    let _type  = this.getType(type)
    const params = this.getAttrs(attrs)
    if (_type === "cookie") {
      __setCookie(key, value, __assign({}, this.defaultAttrs, params))
    } else {
      __setStorage(key, value, _type)
    }
  }

  get (key: string, type?:LocalParams) {

    if (!key) {return}

    let _type  = this.getType(type)

    return _type === "cookie" ? __getCookie(key) : __getStorage(key, _type)
  }

  remove (key: string, type ?:LocalParams, attrs?: CookieProps ) {

    let _type  = this.getType(type)

    const params = this.getAttrs(attrs)

    _type === "cookie"
    ? (__setCookie(key, '', __assign({}, params, { expires: -1 })))
    : (__removeStorage(key, _type))

  }

  clear(type: LocalParams = "cookie") {

    type === "cookie"
      ? (__clearCookie())
      : (__clearStorage(type))
  }

}

export default new LocalCache();
