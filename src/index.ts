import {isObject, isString, isCookie} from './utils'


type CacheTe = "localStorage" | "sessionStorage" | "cookie";
interface FormProps {
  [name: string]: any
}

type mixinsArgs = CacheTe | FormProps | undefined

class LocalCache {

  defaultType : CacheTe;
  defaultAttrs: any;

  constructor() {
    this.defaultType = 'cookie'
    this.defaultAttrs = {
      path: "/"
    }
  }

  // 获取需要更改的缓存类型
  private getType (t1: any , t2: any ): CacheTe {
    if (t1 && isCookie(t1)) {
      return t1
    } else if (t2 && isCookie(t2)){
      return t2
    }
    return this.defaultType
  }

  // 获取缓存的设置参数
  private getAttrs (t1: mixinsArgs , t2: mixinsArgs ):FormProps {
    return isObject(t1)
        ? t1 
        : isObject(t2)
          ? t2 
          : this.defaultAttrs
  }

  set(name: string, value: any, t?: CacheTe | FormProps, attrs?: CacheTe | FormProps ) {
    let type  = this.getType(t, attrs)
    const params = this.getAttrs(t, attrs)
     if (type === "cookie") {
      // Cookies.set(key, value);
    } else {
      window[type].setItem(name, JSON.stringify(value));
    }
  }

  get(name: string, type: CacheTe = "cookie") {
    let value: any = "";
    if (type === "cookie") {
      // value = Cookies.get(key);
    } else {
      value = window[type].getItem(name) || "";
    }

    return value
  }

  clear(type: CacheTe = "cookie") {
    if (type === "cookie") {
      document.cookie
        .split(";")
        .forEach(
          (cookie) =>
            (document.cookie = cookie
              .replace(/^ +/, "")
              .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
        );
    } else {
      window[type].clear();
    }
  }

  remove (key: string, type: CacheTe = "cookie") {
    if (type === "cookie") {
      // Cookies.remove(key);
    } else {
      window[type].removeItem(key);
    }
  }

  delete(key: string, type: CacheTe = "cookie") {
    this.remove(key, type)
  }
}

export default new LocalCache();
