import type { HTMLAttributes } from 'react'

import type { SpinnerSize } from './spinnerClasses'
import { spinnerClasses } from './spinnerClasses'

type Props = HTMLAttributes<HTMLSpanElement> & {
  uiSize?: SpinnerSize
  label?: string
}

export function Spinner({ uiSize = 'md', label = 'Loading', className, ...rest }: Props) {
  return (
    <span
      role="status"
      aria-label={label}
      className={spinnerClasses({ size: uiSize, className })}
      {...rest}
    />
  )
}
