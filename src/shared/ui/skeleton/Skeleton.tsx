import { skeletonClasses } from './skeletonClasses'
import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  /** высота/ширина задаются классами: h-4 w-32 и т.п. */
}

export function Skeleton({ className, ...rest }: Props) {
  return <div className={skeletonClasses({ className })} {...rest} />
}
