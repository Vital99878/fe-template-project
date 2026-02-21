import { cardClasses } from './cardClasses'
import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...rest }: Props) {
  return <div className={cardClasses({ className })} {...rest} />
}
