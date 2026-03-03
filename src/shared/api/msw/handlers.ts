import { HttpResponse } from 'msw'

import { api } from '@/shared/api/endpoints'
import {
  getEnum,
  getInt,
  getMe,
  getString,
  getUserById,
  patchMe,
  searchUsers,
} from '@/shared/api/msw'

import { jsonError, jsonOk } from './responses'
import { withScenario } from './withScenario'

export const handlers = [
  withScenario(api.auth.me, {
    happy: async () => await jsonOk(getMe()),
    forbidden: () => jsonError(403, 'No access'),
  }),

  withScenario(api.auth.updateMe, {
    happy: async ({ request }) => {
      const body = (await request.json()) as { name: string }

      // ✅ stateful mock: меняем "профиль"
      patchMe({ name: body.name })

      // 204 No Content
      return new HttpResponse(null, { status: 204 })
    },
    forbidden: () => jsonError(403, 'No rights to update profile'),
  }),

  // ✅ path params: /users/:id
  withScenario(api.users.byId, {
    happy: ({ params }) => {
      const id = String(params.id)
      const user = getUserById(id)
      if (!user) return jsonError(404, `User ${id} not found`)
      return jsonOk(user)
    },
  }),

  // ✅ query params: /users?q=&page=&limit=&sort=&order=
  withScenario(api.users.search, {
    happy: ({ request }) => {
      const url = new URL(request.url)

      const q = getString(url, 'q')
      const page = getInt(url, 'page', { min: 1 }) ?? 1
      const limit = getInt(url, 'limit', { min: 1, max: 100 }) ?? 10
      const sort = getEnum(url, 'sort', ['name', 'createdAt'] as const) ?? 'createdAt'
      const order = getEnum(url, 'order', ['asc', 'desc'] as const) ?? 'desc'

      return jsonOk(searchUsers({ q, page, limit, sort, order }))
    },
  }),
]
