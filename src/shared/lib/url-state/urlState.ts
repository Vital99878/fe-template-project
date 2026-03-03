// src/shared/lib/url-state/urlState.ts
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export type UrlStateCodec<TState> = {
  parse: (params: URLSearchParams) => TState
  serialize: (state: TState) => URLSearchParams
}

export type UrlStateOptions<TState> = {
  /**
   * replace=true не засоряет историю браузера (идеально для поиска/фильтров).
   */
  replace?: boolean

  /**
   * Позволяет делать нормализацию после patch (например, сброс page=1 при смене фильтров).
   */
  normalize?: (next: TState, patch: Partial<TState>, prev: TState) => TState
}

export function useUrlState<TState>(
  codec: UrlStateCodec<TState>,
  options: UrlStateOptions<TState> = {},
) {
  const [params, setParams] = useSearchParams()

  const state = useMemo(() => codec.parse(params), [params, codec])

  const setState = useCallback(
    (patch: Partial<TState>) => {
      const merged = { ...(state as any), ...(patch as any) } as TState
      const next = options.normalize ? options.normalize(merged, patch, state) : merged
      const nextParams = codec.serialize(next)
      setParams(nextParams, { replace: options.replace ?? true })
    },
    [state, codec, options, setParams],
  )

  return [state, setState] as const
}
