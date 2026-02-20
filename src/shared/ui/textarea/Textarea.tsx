import { textareaClasses } from './textareaClasses'
import type { TextareaSize } from './textareaClasses'
import type { TextareaHTMLAttributes } from 'react'

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
