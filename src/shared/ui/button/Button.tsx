import { buttonClasses } from './buttonClasses'
import type { ButtonSize, ButtonVariant } from './buttonClasses'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Spinner } from '@/shared/ui/spinner'

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
  const isDisabled = disabled || isLoading

  const loader = loadingIcon ?? <Spinner uiSize="sm" />

  return (
    <button
      type={type}
      disabled={isDisabled}
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
      {/* left */}
      {isLoading ? (
        <span className="shrink-0">{loader}</span>
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}

      {/* text */}
      <span className="min-w-0">{children}</span>

      {/* right */}
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}

      {isLoading ? <span className="sr-only">Loading</span> : null}
    </button>
  )
}
