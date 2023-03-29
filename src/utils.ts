
export function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isString(str: any) {

  return typeof str === "string" || str instanceof String
}

export function isCookie(str: any): boolean {
  return ["localStorage", "sessionStorage", "cookie"].includes(str)
}