import { cardContentClasses } from './cardClasses'
import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

export function CardContent({ className, ...rest }: Props) {
  return <div className={cardContentClasses({ className })} {...rest} />
}
