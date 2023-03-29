
type CacheTe = "localStorage" | "sessionStorage" | "cookie";

class LocalCache {
  set(key: string, value: any, type: CacheTe = "cookie") {
    if (type === "cookie") {
      // Cookies.set(key, value);
      document.cookie = ''
    } else {
      window[type].setItem(key, JSON.stringify(value));
    }
  }

  get(key: string, type: CacheTe = "cookie") {
    let value: any;
    if (type === "cookie") {
      // value = Cookies.get(key);
    } else {
      value = window[type].getItem(key) || "";
    }
    if (value) {
      return value;
    }
    return null;
  }

  delete(key: string, type: CacheTe = "cookie") {
    if (type === "cookie") {
      // Cookies.remove(key);
    } else {
      window[type].removeItem(key);
    }
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
}

export default new LocalCache();
