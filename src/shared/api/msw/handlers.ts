import { HttpResponse } from 'msw'
import { withScenario } from './withScenario'
import { jsonError, jsonOk } from './responses'
import { api } from '@/shared/api/endpoints'
import { getMe, patchMe } from '@/shared/api/msw/state'
import { makeUserById, searchUsers } from '@/shared/api/msw/factories/user'

export const handlers = [
  withScenario(api.auth.me, {
    happy: async () => jsonOk(getMe()),
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

  // ✅ пример path params
  withScenario(api.users.byId, {
    happy: ({ params }) => jsonOk(makeUserById(String(params.id))),
  }),

  // ✅ пример query params
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
