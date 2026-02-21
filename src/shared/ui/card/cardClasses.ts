import { cx } from '@/shared/lib/cx'

type Opts = {
  className?: string
}

export function cardClasses({ className }: Opts = {}) {
  return cx('rounded-lg border border-border bg-card text-card-fg shadow-sm', className)
}

export function cardHeaderClasses({ className }: Opts = {}) {
  return cx('border-b border-border px-6 py-4', className)
}

export function cardContentClasses({ className }: Opts = {}) {
  return cx('px-6 py-4', className)
}

export function cardFooterClasses({ className }: Opts = {}) {
  return cx('border-t border-border px-6 py-4', className)
}
