import type { AppError } from '@/shared/api/types'
import { normalizeError } from '@/shared/api/index'

function isAppError(value: unknown): value is AppError {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return typeof v.code === 'string' && typeof v.message === 'string'
}

export function toAppError(error: unknown): AppError {
  if (isAppError(error)) return error

  try {
    return normalizeError(error)
  } catch {
    return {
      code: 'UNKNOWN',
      message: error instanceof Error ? error.message : 'Неизвестная ошибка',
    } as AppError
  }
}
