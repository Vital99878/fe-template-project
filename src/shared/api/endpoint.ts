import type { HttpMethod } from './types'

export type Endpoint<TReq, TRes, TQuery = void, TPath = void> = {
  method: HttpMethod
  path: string
  // purely for typing
  __req?: TReq
  __res?: TRes
  __query?: TQuery
  __path?: TPath
}

export function endpoint<TReq = void, TRes = void, TQuery = void, TPath = void>(
  method: HttpMethod,
  path: string,
): Endpoint<TReq, TRes, TQuery, TPath> {
  return { method, path }
}

export type InferReq<TEndpoint> =
  TEndpoint extends Endpoint<infer TReq, any, any, any> ? TReq : never
export type InferRes<TEndpoint> =
  TEndpoint extends Endpoint<any, infer TRes, any, any> ? TRes : never
export type InferQuery<TEndpoint> =
  TEndpoint extends Endpoint<any, any, infer TQuery, any> ? TQuery : never
export type InferPath<TEndpoint> =
  TEndpoint extends Endpoint<any, any, any, infer TPath> ? TPath : never
