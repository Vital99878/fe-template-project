import React from 'react'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import type { LinkSize, LinkVariant } from './linkClasses'
import { linkClasses } from './linkClasses'

type RouterLinkProps = React.ComponentProps<typeof Link>

type LinkRenderState = {
  isActive: boolean
  isTransitioning: boolean
}

type Props = Omit<RouterLinkProps, 'children' | 'className'> & {
  variant?: LinkVariant
  size?: LinkSize
  underline?: 'hover' | 'always' | 'never'
  className?: string
  /** поддерживает обычный children и render-prop от TanStack Link */
  children?: ReactNode | ((state: LinkRenderState) => ReactNode)
}

function renderChildren(children: Props['children'], state: LinkRenderState): ReactNode {
  return typeof children === 'function' ? children(state) : children
}

export function AppLink({
  variant = 'default',
  size = 'md',
  underline = 'hover',
  className,
  children,
  ...rest
}: Props) {
  return (
    <Link {...rest} className={linkClasses({ variant, size, underline, className })}>
      {(state) => <>{renderChildren(children, state)}</>}
    </Link>
  )
}
