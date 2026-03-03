import { endpoint } from './endpoint'

// Пример типов (потом заменишь на реальные)
export type GetMeResponse = { id: string; name: string }
export type UpdateMeRequest = { name: string }
export type UpdateMeResponse = { ok: true }
export type User = { id: string; name: string; email: string; createdAt: string }
export type UsersBySearch = { limit: number; page: number; total: number; items: Array<User> }
export type QueryToSearchUsers = {
  q: string
  page: number
  limit: number
  sort?: string
  order?: string
}

export const api = {
  auth: {
    me: endpoint<void, GetMeResponse>('GET', '/me'),
    updateMe: endpoint<UpdateMeRequest, void>('PATCH', '/me'),
  },
  users: {
    // path params пример
    byId: endpoint<void, User, void, { id: string }>('GET', '/users/:id'),
    // query params пример
    search: endpoint<void, UsersBySearch, QueryToSearchUsers, void>('GET', '/users'),
  },
} as const
