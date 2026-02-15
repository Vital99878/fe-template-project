import { withScenario } from './withScenario'
import { jsonError, jsonOk } from './responses'
import { makeMe } from './factories'
import { api } from '@/shared/api/endpoints'

export const handlers = [
  withScenario(api.auth.me, {
    happy: async () => jsonOk(makeMe({ id: '11' })),
    forbidden: () => jsonError(404, 'Page does not exist'),

    // пример точечного сценария для одного эндпоинта (опционально)
    // serverError: () => jsonError(500, 'ME endpoint exploded'),
  }),

  withScenario(api.auth.updateMe, {
    happy: async ({ request }) => {
      const body = (await request.json()) as { name: string }
      return jsonOk({ ok: true, name: body.name })
    },

    // например, можно дать “валидацию” для этого эндпоинта
    // (это не новый сценарий, просто кастом на serverError/forbidden и т.п.)
    forbidden: () => jsonError(403, 'No rights to update profile'),
  }),
]
