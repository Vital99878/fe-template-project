import { cx } from '@/shared/lib/cx'

export type TextareaSize = 'sm' | 'md' | 'lg'

type Opts = {
  size?: TextareaSize
  invalid?: boolean
  fullWidth?: boolean
  className?: string
}

export function textareaClasses({ size = 'md', invalid, fullWidth, className }: Opts = {}) {
  const base =
    'block w-full rounded-md border bg-card text-fg shadow-sm transition ' +
    'placeholder:text-muted ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ' +
    'disabled:opacity-60 disabled:pointer-events-none'

  const sizes: Record<TextareaSize, string> = {
    sm: 'min-h-[80px] px-3 py-2 text-sm',
    md: 'min-h-[96px] px-3 py-2.5 text-sm',
    lg: 'min-h-[120px] px-4 py-3 text-base',
  }

  return cx(
    base,
    sizes[size],
    fullWidth && 'w-full',
    invalid ? 'border-danger focus-visible:ring-danger/40' : 'border-border',
    className,
  )
}
