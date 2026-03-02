// buttonClasses.ts
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

type Opts = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  disabled,
  className,
}: Opts = {}) {
  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-md font-medium transition ' +
    // важно для сжатия внутри flex/grid-контейнеров
    'min-w-0 max-w-full ' +
    'leading-none ' +
    'select-none whitespace-nowrap ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

  const state = cx(
    // active только когда можно нажимать
    !(disabled || loading) && 'active:translate-y-px',
    (disabled || loading) && 'pointer-events-none opacity-60',
    loading && 'cursor-wait',
    disabled && !loading && 'cursor-not-allowed',
  )

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-fg hover:opacity-90',
    secondary: 'border border-border bg-card text-fg hover:bg-border/30',
    ghost: 'bg-transparent text-fg hover:bg-border/30',
    danger: 'bg-danger text-danger-fg hover:opacity-90',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  }

  return cx(base, variants[variant], sizes[size], fullWidth && 'w-full', state, className)
}
