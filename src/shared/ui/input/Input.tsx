import { inputClasses } from './inputClasses'
import type { InputSize } from './inputClasses'
import type { InputHTMLAttributes } from 'react'

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
