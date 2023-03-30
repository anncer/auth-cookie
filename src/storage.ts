import type { StorageParams } from './types'

  
  export const __setStorage = function (key: string, value: any, type: StorageParams ) {
    
    if (typeof(Storage) === "undefined") { return }
    window[type].setItem(key, JSON.stringify(value));
  }

  export const __getStorage = function ( key: string, type: StorageParams) {
    if (typeof(Storage) === "undefined") { return }
    return window[type].getItem(key) || ""
  }

  export const __removeStorage = function (key: string, type: StorageParams) {
    if (typeof(Storage) === "undefined") { return }
    window[type].removeItem(key);
  }

  export const __clearStorage = function (type: StorageParams) {
    if (typeof(Storage) === "undefined") { return }
    window[type].clear();
  }