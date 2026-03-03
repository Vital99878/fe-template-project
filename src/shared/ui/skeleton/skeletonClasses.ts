import { cx } from '@/shared/lib/cx'

type Opts = {
  className?: string
}

export function skeletonClasses({ className }: Opts = {}) {
  return cx('animate-pulse rounded-md bg-border/40', className)
}
