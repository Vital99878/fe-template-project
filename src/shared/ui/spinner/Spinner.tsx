import { spinnerClasses } from './spinnerClasses'
import type { SpinnerSize } from './spinnerClasses'
import type { HTMLAttributes } from 'react'

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
