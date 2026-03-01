import type { QueryKey } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import type { ErrorComponentProps } from '@tanstack/react-router'

import { ErrorScreen } from '@/shared/ui/blocks'

function extractQueryKey(error: unknown): QueryKey | undefined {
  return typeof error === 'object' && error && '__queryKey' in error
    ? ((error as any).__queryKey as QueryKey)
    : undefined
}

export function RouteErrorBoundary({ error, reset }: ErrorComponentProps) {
  const qc = useQueryClient()

  const onRetry = async () => {
    const key = extractQueryKey(error)

    await qc.invalidateQueries({ queryKey: key, exact: true })

    reset()
  }

  return <ErrorScreen error={error} onRetry={onRetry} />
}
