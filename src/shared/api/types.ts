export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type ApiErrorCode = 'NETWORK' | 'TIMEOUT' | 'CANCELED' | 'HTTP_ERROR' | 'UNKNOWN'

export type AppError = {
  code: ApiErrorCode
  message: string
  status?: number
  requestId?: string
  details?: unknown
  cause?: unknown
}
