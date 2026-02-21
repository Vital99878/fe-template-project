import { cx } from '@/shared/lib/cx'

export type SpinnerSize = 'sm' | 'md' | 'lg'

type Opts = {
  size?: SpinnerSize
  className?: string
}

export function spinnerClasses({ size = 'md', className }: Opts = {}) {
  const base = 'inline-block animate-spin rounded-full border border-border border-t-transparent'
  const sizes: Record<SpinnerSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }
  return cx(base, sizes[size], className)
}
