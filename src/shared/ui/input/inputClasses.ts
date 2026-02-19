import { cx } from '@/shared/lib/cx'

export type InputSize = 'sm' | 'md' | 'lg'

type Opts = {
  size?: InputSize
  invalid?: boolean
  fullWidth?: boolean
  className?: string
}

export function inputClasses({ size = 'md', invalid, fullWidth, className }: Opts = {}) {
  const base =
    'block rounded-md border bg-card text-fg shadow-sm transition ' +
    'placeholder:text-muted ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ' +
    'disabled:opacity-60 disabled:pointer-events-none'

  const sizes: Record<InputSize, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  }

  return cx(
    base,
    sizes[size],
    fullWidth && 'w-full',
    invalid ? 'border-danger focus-visible:ring-danger/40' : 'border-border',
    className,
  )
}
