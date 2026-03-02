// Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { Spinner } from '@/shared/ui/spinner'

import type { ButtonSize, ButtonVariant } from './buttonClasses'
import { buttonClasses } from './buttonClasses'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  isLoading?: boolean
  /** можно переопределить иконку лоадера */
  loadingIcon?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  isLoading,
  loadingIcon,
  disabled,
  leftIcon,
  rightIcon,
  type = 'button',
  className,
  children,
  ...rest
}: Props) {
  const isDisabled = Boolean(disabled || isLoading)
  const loader = loadingIcon ?? <Spinner uiSize="sm" />

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={buttonClasses({
        variant,
        size,
        fullWidth,
        loading: isLoading,
        disabled: isDisabled,
        className,
      })}
      {...rest}
    >
      {/* content (keeps size; hidden while loading) */}
      <span
        className={
          'inline-flex max-w-full min-w-0 items-center justify-center gap-2' +
          (isLoading ? ' opacity-0' : '')
        }
      >
        {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}

        <span className="min-w-0 truncate">{children}</span>

        {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      </span>

      {/* centered loader overlay */}
      {isLoading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="shrink-0">{loader}</span>
          <span className="sr-only">Loading</span>
        </span>
      ) : null}
    </button>
  )
}
