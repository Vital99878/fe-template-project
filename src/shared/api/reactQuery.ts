import { mutationOptions, queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { request } from './request'
import type { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { Endpoint, InferPath, InferQuery, InferReq, InferRes } from './endpoint'
import type { AppError } from './types'

type NoData = void | undefined | never

type RequireOrForbid<TKey extends string, TValue> = [TValue] extends [NoData]
  ? { [P in TKey]?: never }
  : { [P in TKey]: TValue }

type QueryArgs<TEndpoint extends Endpoint<NoData, any, any, any>> = RequireOrForbid<
  'path',
  InferPath<TEndpoint>
> &
  RequireOrForbid<'query', InferQuery<TEndpoint>> & { config?: unknown } // намеренно не участвует в queryKey

type MutationVars<TEndpoint extends Endpoint<any, any, any, any>> = RequireOrForbid<
  'body',
  InferReq<TEndpoint>
> &
  RequireOrForbid<'path', InferPath<TEndpoint>> &
  RequireOrForbid<'query', InferQuery<TEndpoint>> & { config?: unknown }

// ---------- queryKey ----------
export function apiQueryKey<TEndpoint extends Endpoint<NoData, any, any, any>>(
  endpoint: TEndpoint,
  args?: QueryArgs<TEndpoint>,
): QueryKey {
  const base: Array<unknown> = [endpoint.method, endpoint.path]

  if (args?.path !== undefined || args?.query !== undefined) {
    base.push({ path: (args as any)?.path, query: (args as any)?.query })
  }

  return base as QueryKey
}

// ---------- query options ----------
export function apiQueryOptions<TEndpoint extends Endpoint<NoData, any, any, any>>(
  endpoint: TEndpoint,
  args?: QueryArgs<TEndpoint>,
  options?: Omit<
    UseQueryOptions<InferRes<TEndpoint>, AppError, InferRes<TEndpoint>, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) {
  return queryOptions({
    queryKey: apiQueryKey(endpoint, args),
    queryFn: () => request(endpoint, args as any),
    ...options,
  })
}

// ---------- hook ----------
export function useApiQuery<TEndpoint extends Endpoint<NoData, any, any, any>>(
  endpoint: TEndpoint,
  args?: QueryArgs<TEndpoint>,
  options?: Omit<
    UseQueryOptions<InferRes<TEndpoint>, AppError, InferRes<TEndpoint>, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery(apiQueryOptions(endpoint, args, options))
}

// ---------- mutation options ----------
export function apiMutationOptions<TEndpoint extends Endpoint<any, any, any, any>>(
  endpoint: TEndpoint,
  options?: Omit<
    UseMutationOptions<InferRes<TEndpoint>, AppError, MutationVars<TEndpoint>, unknown>,
    'mutationFn' | 'mutationKey'
  >,
) {
  return mutationOptions({
    mutationKey: [endpoint.method, endpoint.path],
    mutationFn: (vars: MutationVars<TEndpoint>) => request(endpoint, vars as any),
    ...options,
  })
}

// ---------- hook ----------
export function useApiMutation<TEndpoint extends Endpoint<any, any, any, any>>(
  endpoint: TEndpoint,
  options?: Omit<
    UseMutationOptions<InferRes<TEndpoint>, AppError, MutationVars<TEndpoint>, unknown>,
    'mutationFn' | 'mutationKey'
  >,
) {
  return useMutation(apiMutationOptions(endpoint, options))
}
