import { cardHeaderClasses } from './cardClasses'
import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

export function CardHeader({ className, ...rest }: Props) {
  return <div className={cardHeaderClasses({ className })} {...rest} />
}
