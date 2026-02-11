import { isAxiosError } from 'axios'
import type { AxiosError } from 'axios'
import type { AppError } from './types'

/**
 * Пытается извлечь идентификатор запроса (request id) из HTTP-заголовков ответа.
 *
 * Зачем:
 * - Многие бэкенды/прокси добавляют request id в headers (для трассировки и поиска логов).
 * - Мы сохраняем его в `AppError.requestId`, чтобы показывать в UI/логах и быстрее искать проблему на сервере.
 *
 * Как работает:
 * - Принимает `headers` в "любом" виде (как приходит из axios: объект, Map-подобное, или что угодно).
 * - Если headers не объект — возвращает `undefined`.
 * - Ищет значение по списку известных заголовков (в порядке приоритета):
 *   - `x-request-id`
 *   - `x-rquid`
 *   - `x-correlation-id`
 * - Возвращает первое найденное непустое строковое значение, иначе `undefined`.
 *
 * Важно:
 * - Функция не делает нормализацию регистра ключей. Она ожидает, что ключи будут
 *   в нижнем регистре (как это обычно отдаёт axios в `response.headers`).
 */
function pickRequestId(headers: unknown): string | undefined {
  if (!headers || typeof headers !== 'object') return undefined
  const h = headers as Record<string, unknown>
  const candidates = ['x-request-id', 'x-rquid', 'x-correlation-id']
  for (const key of candidates) {
    const v = h[key]
    if (typeof v === 'string' && v.trim()) return v
  }
  return undefined
}

export function normalizeError(error: unknown): AppError {
  // Axios error
  if (isAxiosError(error)) {
    const e = error as AxiosError
    const status = e.response?.status
    const requestId = pickRequestId(e.response?.headers)

    // Abort / cancel
    if (e.code === 'ERR_CANCELED') {
      return {
        code: 'CANCELED',
        message: 'Запрос отменён',
        status,
        requestId,
        cause: error,
      }
    }

    // Timeout (axios uses ECONNABORTED historically; also possible "ETIMEDOUT")
    if (e.code === 'ECONNABORTED' || e.code === 'ETIMEDOUT') {
      return {
        code: 'TIMEOUT',
        message: 'Превышено время ожидания ответа',
        status,
        requestId,
        cause: error,
      }
    }

    // Network (no response)
    if (!e.response) {
      return {
        code: 'NETWORK',
        message: 'Нет соединения или сервер недоступен',
        requestId,
        cause: error,
      }
    }

    // HTTP error with response
    const serverMessage =
      typeof (e.response.data as any)?.message === 'string'
        ? (e.response.data as any).message
        : undefined

    return {
      code: 'HTTP_ERROR',
      message: serverMessage ?? `Ошибка сервера (${status})`,
      status,
      requestId,
      details: e.response.data,
      cause: error,
    }
  }

  // Non-axios
  if (error instanceof Error) {
    return { code: 'UNKNOWN', message: error.message, cause: error }
  }

  return { code: 'UNKNOWN', message: 'Неизвестная ошибка', cause: error }
}
