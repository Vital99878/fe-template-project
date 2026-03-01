import type { HTMLAttributes } from 'react'

import { cardHeaderClasses } from './cardClasses'

type Props = HTMLAttributes<HTMLDivElement>

export function CardHeader({ className, ...rest }: Props) {
  return <div className={cardHeaderClasses({ className })} {...rest} />
}
