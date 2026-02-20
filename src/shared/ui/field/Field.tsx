import { cloneElement, useId } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { cx } from '@/shared/lib/cx'

type Props = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  required?: boolean
  children: ReactElement<ControlProps>
  className?: string
}
type ControlProps = {
  id?: string
  required?: boolean
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export function Field({ label, hint, error, required, children, className }: Props) {
  const childProps = children.props

  const id = `field-${useId()}`
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  const describedBy =
    [childProps['aria-describedby'], hintId, errorId].filter(Boolean).join(' ') || undefined

  const control = cloneElement(children, {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    required: required ?? childProps.required,
  })

  return (
    <div className={cx('space-y-1', className)}>
      {label ? (
        <label htmlFor={id} className="text-fg text-sm font-medium">
          {label}
          {required ? <span className="text-danger ml-1">*</span> : null}
        </label>
      ) : null}

      {control}

      {hint ? (
        <div id={hintId} className="text-muted text-xs">
          {hint}
        </div>
      ) : null}

      {error ? (
        <div id={errorId} className="text-danger text-xs">
          {error}
        </div>
      ) : null}
    </div>
  )
}
