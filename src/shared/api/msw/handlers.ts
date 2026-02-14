import { HttpResponse, delay } from 'msw'
import { makeHandler } from './makeHandler'
import { api } from '@/shared/api/index'

export const handlers = [
  // GET /me
  makeHandler(api.auth.me, async () => {
    await delay() // реалистичная задержка 100–400ms :contentReference[oaicite:2]{index=2}
    return HttpResponse.json({ id: '1', name: 'Виталий' })
  }),

  // PATCH /me
  makeHandler(api.auth.updateMe, async ({ request }) => {
    const body = (await request.json()) as { name: string }
    return HttpResponse.json({ ok: true, name: body.name })
  }),

  // Пример для path params: GET /users/:id
  // MSW умеет `:id` и отдаёт params в resolver :contentReference[oaicite:3]{index=3}
  // makeHandler(api.users.byId, ({ params }) => HttpResponse.json({ id: params.id, name: '...' })),
]
