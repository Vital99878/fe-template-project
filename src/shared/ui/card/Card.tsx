import type { HTMLAttributes } from 'react'

import { cardClasses } from './cardClasses'

type Props = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...rest }: Props) {
  return <div className={cardClasses({ className })} {...rest} />
}
