import { attachInterceptors, httpClient } from '@/shared/api'

export function initApi() {
  attachInterceptors(httpClient)
}
