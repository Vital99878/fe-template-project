import { Link } from '@tanstack/react-router'

export function NotFoundScreen() {
  return (
    <div className="bg-bg text-fg min-h-dvh">
      <div className="mx-auto max-w-2xl p-6">
        <div className="border-border bg-card rounded-lg border p-6 shadow-sm">
          <h1 className="text-xl font-semibold">Страница не найдена</h1>
          <p className="text-muted mt-2 text-sm">
            Похоже, такого адреса нет. Проверь URL или вернись на главную.
          </p>

          <div className="mt-6">
            <Link
              to="/"
              className="bg-primary text-primary-fg inline-flex rounded-md px-4 py-2 text-sm font-medium transition hover:opacity-90"
            >
              На главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
