import { endpoint } from './endpoint'

// Пример типов (потом заменишь на реальные)
export type GetMeResponse = { id: string; name: string }
export type UpdateMeRequest = { name: string }
export type UpdateMeResponse = { ok: true }
export type User = { id: string; name: string }

export const api = {
  auth: {
    me: endpoint<void, GetMeResponse>('GET', '/me'),
    updateMe: endpoint<UpdateMeRequest, UpdateMeResponse>('PATCH', '/me'),
  },
  users: {
    byId: endpoint<void, User, void, { id: string }>('GET', '/users/:id'),
    search: endpoint<void, Array<User>, { q: string; limit?: number }>('GET', '/users'),
  },
} as const
