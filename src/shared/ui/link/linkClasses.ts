import { cx } from '@/shared/lib/cx'

export type LinkVariant = 'default' | 'muted' | 'danger'
export type LinkSize = 'sm' | 'md'

type Opts = {
  variant?: LinkVariant
  size?: LinkSize
  underline?: 'hover' | 'always' | 'never'
  className?: string
}

export function linkClasses({
  variant = 'default',
  size = 'md',
  underline = 'hover',
  className,
}: Opts = {}) {
  const base =
    'inline-flex items-center gap-1 rounded-sm transition ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

  const variants: Record<LinkVariant, string> = {
    default: 'text-primary hover:opacity-90',
    muted: 'text-muted hover:text-fg',
    danger: 'text-danger hover:opacity-90',
  }

  const sizes: Record<LinkSize, string> = {
    sm: 'text-sm',
    md: 'text-sm',
  }

  const underlines = {
    hover: 'no-underline hover:underline underline-offset-4',
    always: 'underline underline-offset-4',
    never: 'no-underline',
  } as const

  return cx(base, variants[variant], sizes[size], underlines[underline], className)
}
