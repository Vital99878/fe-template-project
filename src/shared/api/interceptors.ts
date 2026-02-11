import { normalizeError } from './normalizeError'
import type { AxiosInstance } from 'axios'

export function attachInterceptors(client: AxiosInstance) {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Всегда кидаем нормализованную ошибку наружу
      return Promise.reject(normalizeError(error))
    },
  )
}
