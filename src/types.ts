

export type StorageParams = "localStorage" | "sessionStorage";

export type CookieParams = 'cookie'

export type LocalParams = CookieParams | StorageParams

export interface CookieProps {
  [name: string]: any
}
