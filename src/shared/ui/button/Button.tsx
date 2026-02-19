import { buttonClasses } from './buttonClasses'
import type { ButtonSize, ButtonVariant } from './buttonClasses'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  type = 'button',
  className,
  children,
  ...rest
}: Props) {
  const isDisabled = disabled || isLoading

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
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span className="min-w-0">{children}</span>
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      {isLoading ? <span className="sr-only">Loading</span> : null}
    </button>
  )
}
