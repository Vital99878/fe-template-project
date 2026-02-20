import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { toAppError } from '@/shared/lib/errors/toAppError'

type ErrorScreenProps = {
  title?: string
  error?: unknown
  onRetry?: () => void
  actions?: ReactNode
}

export function ErrorScreen({
  title = 'Что-то пошло не так',
  error,
  onRetry,
  actions,
}: ErrorScreenProps) {
  const appError = error ? toAppError(error) : null

  return (
    <div className="bg-bg text-fg min-h-dvh">
      <div className="mx-auto max-w-2xl p-6">
        <div className="border-border bg-card rounded-lg border shadow-sm">
          <div className="p-6">
            <h1 className="text-xl font-semibold">{title}</h1>

            <div className="text-fg mt-3 space-y-2 text-sm">
              <p className="text-fg/90">{appError?.message ?? 'Не удалось выполнить операцию.'}</p>

              {appError?.status != null ? (
                <p className="text-muted">HTTP: {appError.status}</p>
              ) : null}
              {appError?.code ? <p className="text-muted">code: {appError.code}</p> : null}
              {appError?.requestId ? (
                <p className="text-muted">requestId: {appError.requestId}</p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {onRetry ? (
                <button
                  type="button"
                  onClick={onRetry}
                  className="bg-primary text-primary-fg rounded-md px-4 py-2 text-sm font-medium transition hover:opacity-90"
                >
                  Повторить
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="border-border bg-card text-fg hover:bg-border/30 rounded-md border px-4 py-2 text-sm font-medium transition"
              >
                Перезагрузить
              </button>

              <Link
                to="/"
                className="border-border bg-card text-fg hover:bg-border/30 rounded-md border px-4 py-2 text-sm font-medium transition"
              >
                На главную
              </Link>

              {actions}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
