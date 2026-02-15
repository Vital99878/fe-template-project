import { HttpResponse, delay } from 'msw'
import type { JsonBodyType } from 'msw'

export function jsonOk<T extends JsonBodyType>(
  data: T,
  init?: { status?: number; headers?: Record<string, string> },
) {
  return HttpResponse.json(data, { status: init?.status ?? 200, headers: init?.headers })
}

export function jsonError(status: number, message: string, details?: unknown) {
  return HttpResponse.json({ message, details }, { status })
}

export function unauthorized(message = 'Unauthorized') {
  return jsonError(401, message)
}

export function forbidden(message = 'Forbidden') {
  return jsonError(403, message)
}

export function serverError(message = 'Internal Server Error') {
  return jsonError(500, message)
}

export async function timeoutForever() {
  // “вечная” задержка — запрос зависнет (полезно для проверки спиннеров)
  await delay('infinite')
  return HttpResponse.text('', { status: 408 })
}
