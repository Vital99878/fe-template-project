import { http } from 'msw'
import type { HttpHandler, HttpResponseResolver } from 'msw'
import type { Endpoint } from '@/shared/api/index'

export function makeHandler(
  endpoint: Endpoint<any, any, any, any>,
  resolver: HttpResponseResolver,
): HttpHandler {
  switch (endpoint.method) {
    case 'GET':
      return http.get(endpoint.path, resolver)
    case 'POST':
      return http.post(endpoint.path, resolver)
    case 'PUT':
      return http.put(endpoint.path, resolver)
    case 'PATCH':
      return http.patch(endpoint.path, resolver)
    case 'DELETE':
      return http.delete(endpoint.path, resolver)
  }
}
