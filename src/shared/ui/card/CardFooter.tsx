import { cardFooterClasses } from './cardClasses'
import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

export function CardFooter({ className, ...rest }: Props) {
  return <div className={cardFooterClasses({ className })} {...rest} />
}
