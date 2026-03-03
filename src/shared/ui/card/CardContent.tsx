import type { HTMLAttributes } from 'react'

import { cardContentClasses } from './cardClasses'

type Props = HTMLAttributes<HTMLDivElement>

export function CardContent({ className, ...rest }: Props) {
  return <div className={cardContentClasses({ className })} {...rest} />
}
