import type { InputHTMLAttributes } from 'react'

import type { InputSize } from './inputClasses'
import { inputClasses } from './inputClasses'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  uiSize?: InputSize
  invalid?: boolean
  fullWidth?: boolean
}

export function Input({ invalid, fullWidth, className, uiSize = 'md', ...rest }: Props) {
  return (
    <input {...rest} className={inputClasses({ size: uiSize, invalid, fullWidth, className })} />
  )
}
