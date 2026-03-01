import type { HTMLAttributes } from 'react'

import { cardFooterClasses } from './cardClasses'

type Props = HTMLAttributes<HTMLDivElement>

export function CardFooter({ className, ...rest }: Props) {
  return <div className={cardFooterClasses({ className })} {...rest} />
}
