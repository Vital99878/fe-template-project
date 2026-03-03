import type { HTMLAttributes } from 'react'

import { skeletonClasses } from './skeletonClasses'

type Props = HTMLAttributes<HTMLDivElement> & {
  /** высота/ширина задаются классами: h-4 w-32 и т.п. */
}

export function Skeleton({ className, ...rest }: Props) {
  return <div className={skeletonClasses({ className })} {...rest} />
}
