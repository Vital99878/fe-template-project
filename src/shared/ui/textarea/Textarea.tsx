import type { TextareaHTMLAttributes } from 'react'

import type { TextareaSize } from './textareaClasses'
import { textareaClasses } from './textareaClasses'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  uiSize?: TextareaSize
  invalid?: boolean
  fullWidth?: boolean
}

export function Textarea({ uiSize = 'md', invalid, fullWidth = true, className, ...rest }: Props) {
  return (
    <textarea
      {...rest}
      className={textareaClasses({ size: uiSize, invalid, fullWidth, className })}
    />
  )
}
