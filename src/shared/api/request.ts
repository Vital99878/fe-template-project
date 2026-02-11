import { httpClient } from './httpClient'
import type { AxiosRequestConfig } from 'axios'
import type { Endpoint, InferPath, InferQuery, InferReq, InferRes } from './endpoint'

type RequestOptions = Omit<AxiosRequestConfig, 'url' | 'method' | 'data' | 'params'>

type NoData = void | undefined | never

type RequireOrForbid<TKey extends string, TValue> = [TValue] extends [NoData]
  ? { [P in TKey]?: never }
  : { [P in TKey]: TValue }

type Args<TEndpoint extends Endpoint<any, any, any, any>> = RequireOrForbid<
  'body',
  InferReq<TEndpoint>
> &
  RequireOrForbid<'query', InferQuery<TEndpoint>> &
  RequireOrForbid<'path', InferPath<TEndpoint>> & { config?: RequestOptions }

type PathParamValue = string | number
type PathParams = Partial<Record<string, PathParamValue>>

// компиляция пути вида /users/:id
function compilePath(template: string, params: PathParams) {
  return template.replace(/:([A-Za-z0-9_]+)/g, (_, key: string) => {
    const value = params[key]
    if (value === undefined) {
      throw new Error(`Missing path param: ${key}`)
    }
    return encodeURIComponent(String(value))
  })
}

// 1) Ничего не требуется: body/query/path отсутствуют
export function request<TEndpoint extends Endpoint<NoData, any, NoData, NoData>>(
  endpoint: TEndpoint,
  args?: { config?: RequestOptions },
): Promise<InferRes<TEndpoint>>

// 2) Всё остальное: если где-то задан тип — это требуется в args
export function request<TEndpoint extends Endpoint<any, any, any, any>>(
  endpoint: TEndpoint,
  args: Args<TEndpoint>,
): Promise<InferRes<TEndpoint>>

export async function request<TEndpoint extends Endpoint<any, any, any, any>>(
  endpoint: TEndpoint,
  args?: any,
): Promise<InferRes<TEndpoint>> {
  const url = args?.path
    ? compilePath(endpoint.path, args.path as Record<string, string | number>)
    : endpoint.path

  const { data } = await httpClient.request<InferRes<TEndpoint>>({
    url,
    method: endpoint.method,
    params: args?.query,
    data: args?.body,
    ...args?.config,
  })

  return data
}
