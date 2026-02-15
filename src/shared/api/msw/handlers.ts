import { withScenario } from './withScenario'
import { jsonError, jsonOk } from './responses'
import { api } from '@/shared/api/endpoints'
import { makeMe, makeUserById, searchUsers } from '@/shared/api/msw/factories/user'

export const handlers = [
  withScenario(api.auth.me, {
    happy: async () => jsonOk(makeMe()),
    forbidden: () => jsonError(403, 'No access'),
  }),

  withScenario(api.auth.updateMe, {
    happy: async ({ request }) => {
      const body = (await request.json()) as { name: string }
      return jsonOk({ ok: true, name: body.name })
    },
    forbidden: () => jsonError(403, 'No rights to update profile'),
  }),

  // ✅ path params: /users/:id
  withScenario(api.users.byId, {
    happy: ({ params }) => jsonOk(makeUserById(String(params.id))),
  }),

  // ✅ query params: /users?q=...&limit=...
  withScenario(api.users.search, {
    happy: ({ request }) => {
      const url = new URL(request.url)
      const q = url.searchParams.get('q') ?? undefined
      const limitRaw = url.searchParams.get('limit')
      const limit = limitRaw ? Number(limitRaw) : undefined

      return jsonOk(searchUsers({ q, limit }))
    },
  }),
]
