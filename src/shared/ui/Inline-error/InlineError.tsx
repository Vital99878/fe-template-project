import { AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'

import { toAppError } from '@/shared/lib/errors/toAppError'

type InlineErrorProps = {
  error: unknown
  title?: string
  onRetry?: () => void
  actions?: ReactNode
  className?: string
  showMeta?: boolean
}

export function InlineError({
  error,
  title = 'Не удалось выполнить действие',
  onRetry,
  actions,
  className,
  showMeta = false,
}: InlineErrorProps) {
  const e = toAppError(error)

  return (
    <div
      role="alert"
      className={['border-border bg-card rounded-lg border p-4 shadow-sm', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="text-danger mt-0.5 shrink-0">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-fg text-sm font-medium">{title}</div>
          <div className="text-fg/90 mt-1 text-sm">{e.message}</div>

          {showMeta ? (
            <div className="text-muted mt-2 space-y-1 text-xs">
              {e.status != null ? <div>HTTP: {e.status}</div> : null}
              {<div>code: {e.code}</div>}
              {e.requestId ? <div>requestId: {e.requestId}</div> : null}
            </div>
          ) : null}

          {onRetry || actions ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {onRetry ? (
                <button
                  type="button"
                  onClick={onRetry}
                  className="bg-primary text-primary-fg rounded-md px-3 py-1.5 text-sm font-medium transition hover:opacity-90"
                >
                  Повторить
                </button>
              ) : null}

              {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
