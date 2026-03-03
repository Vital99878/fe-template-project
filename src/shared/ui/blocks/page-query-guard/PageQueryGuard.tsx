// src/shared/ui/PageQueryGuard/PageQueryGuard.tsx
import type { QueryKey, UseQueryResult } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import type { AppError } from '@/shared/api/index'

type Props<TData> = {
  query: UseQueryResult<TData, AppError>
  /** Если передашь ключ — RouteErrorBoundary сможет сделать точечный retry */
  queryKey?: QueryKey
  /** Что показывать пока грузится */
  loading?: ReactNode
  /** Рендер при успехе */
  children: (data: TData) => ReactNode
}
/**
 * PageQueryGuard
 *
 * Небольшая обёртка для страниц, которая стандартизирует работу с TanStack Query:
 *
 * 1) pending  → рендерит `loading` (fallback UI)
 * 2) error    → делает `throw`, чтобы ошибку отрисовал RouteErrorBoundary (единый ErrorScreen)
 * 3) success  → рендерит `children(data)`
 *
 * Дополнительно:
 * - Если передан `queryKey`, то при `throw` он прикрепляется к ошибке как `__queryKey`.
 *   Это позволяет RouteErrorBoundary сделать "точечный retry" через:
 *   `queryClient.invalidateQueries({ queryKey, exact: true })`, а затем `reset()`.
 *
 * Когда использовать:
 * - ✅ Для страниц, которые полностью зависят от данных (без них страницу показывать бессмысленно).
 * - ❌ Не использовать для небольших виджетов/блоков — там лучше InlineError, чтобы не ронять всю страницу.
 *
 * Пример:
 * ```tsx
 * import { api } from '@/shared/api'
 * import { useApiQuery, apiQueryKey } from '@/shared/api/reactQuery'
 * import { PageQueryGuard } from '@/shared/ui/PageQueryGuard'
 *
 * export function ProfileMePage() {
 *   const q = useApiQuery(api.auth.me)
 *   const key = apiQueryKey(api.auth.me)
 *
 *   return (
 *     <PageQueryGuard
 *       query={q}
 *       queryKey={key}
 *       loading={<div className="p-6 text-sm text-muted">Загрузка…</div>}
 *     >
 *       {(data) => <div className="text-fg">Привет, {data.name}</div>}
 *     </PageQueryGuard>
 *   )
 * }
 * ```
 */

export function PageQueryGuard<TData>({
  query,
  queryKey,
  loading = <div className="text-muted p-6 text-sm">loading…</div>,
  children,
}: Props<TData>) {
  if (query.status === 'pending') return loading

  if (query.status === 'error') {
    throw queryKey != null ? Object.assign(query.error, { __queryKey: queryKey }) : query.error
  }

  return children(query.data)
}
