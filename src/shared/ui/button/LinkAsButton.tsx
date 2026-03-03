import React from 'react'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import type { ButtonSize, ButtonVariant } from './buttonClasses'
import { buttonClasses } from './buttonClasses'

type RouterLinkProps = React.ComponentProps<typeof Link>

type LinkRenderState = {
  isActive: boolean
  isTransitioning: boolean
}

type Props = Omit<RouterLinkProps, 'children'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  isLoading?: boolean
  disabled?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode | ((state: LinkRenderState) => ReactNode)
}

function renderChildren(children: Props['children'], state: LinkRenderState): ReactNode {
  return typeof children === 'function' ? children(state) : children
}

export function LinkAsButton({
  variant = 'primary',
  size = 'md',
  fullWidth,
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  className,
  children,
  onClick,
  tabIndex,
  ...rest
}: Props) {
  const isDisabled = disabled || isLoading

  return (
    <Link
      {...rest}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
        onClick?.(e)
      }}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : tabIndex}
      className={buttonClasses({
        variant,
        size,
        fullWidth,
        loading: isLoading,
        disabled: isDisabled,
        className,
      })}
    >
      {(state) => (
        <>
          {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
          <span className="min-w-0">{renderChildren(children, state)}</span>
          {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
          {isLoading ? <span className="sr-only">Loading</span> : null}
        </>
      )}
    </Link>
  )
}
