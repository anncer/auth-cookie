import {__assign, __isCache, __isObject} from './utils'
import type { LocalParams, CookieProps, CookieUnknow } from './types'
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
  private getType (t1: any , t2: any ): LocalParams {
    if (t1 && __isCache(t1)) {
      return t1
    } else if (t2 && __isCache(t2)){
      return t2
    }
    return this.defaultType
  }

  // 获取缓存的设置参数
  private getAttrs (t1: any , t2: any ): CookieProps {
    return __isObject(t1)
        ? t1 
        : __isObject(t2)
          ? t2 
          : this.defaultAttrs
  }

  set(name: string | number, value: any, t?: CookieUnknow, attrs?: CookieUnknow ) {

    if (!name) {return}

    let key = name && typeof name === "string" ? name : String(name)

    key = encodeURIComponent(key)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape)

    let type  = this.getType(t, attrs)
    const params = this.getAttrs(t, attrs)
    if (type === "cookie") {
      __setCookie(key, value, __assign({}, this.defaultAttrs, params))
    } else {
      __setStorage(key, value, type)
    }
  }

  get (key: string, type:LocalParams = "cookie") {

    if (!key) {return}

    return type === "cookie" ? __getCookie(key) : __getStorage(key, type)
  }

  remove (key: string, type: LocalParams = "cookie", attrs: CookieProps) {

    type === "cookie"
      ? (__setCookie(key, '', __assign({}, attrs, { expires: -1 })))
      : (__removeStorage(key, type))
  }

  clear(type: LocalParams = "cookie") {

    type === "cookie" 
      ? (__clearCookie())
      : (__clearStorage(type))
  }

}

export default new LocalCache();
