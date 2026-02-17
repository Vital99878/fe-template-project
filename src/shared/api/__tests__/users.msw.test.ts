import { describe, expect, it } from 'vitest'

import { api, request } from '@/shared/api'
// поправь путь, если request экспортируется иначе:
// если у тебя helper называется по-другому — замени:
import { toAppError } from '@/shared/lib/errors/toAppError'

describe('MSW users examples', () => {
  it('GET /users/:id -> 404 for unknown id', async () => {
    try {
      await request(api.users.byId, { path: { id: '999' } })
      expect.fail('Expected request to throw')
    } catch (err) {
      const e = toAppError(err)
      expect(e.status).toBe(404)
      // сообщение может быть любым, но обычно есть
      expect(e.message.toLowerCase()).toContain('not found')
    }
  })

  it('GET /users search -> supports q + pagination', async () => {
    const page1 = await request(api.users.search, {
      query: { q: 'вит', page: 1, limit: 5, sort: 'name', order: 'asc' },
    })

    expect(page1.page).toBe(1)
    expect(page1.limit).toBe(5)
    expect(page1.total).toBeGreaterThanOrEqual(page1.items.length)
    expect(page1.items.length).toBeLessThanOrEqual(5)

    // Все элементы должны матчиться по q (как в handlers: name/email содержит q)
    const q = 'вит'
    for (const u of page1.items) {
      const hay = `${u.name} ${u.email}`.toLowerCase()
      expect(hay).toContain(q)
    }

    // Проверим, что page=2 реально даёт другой срез (если данных достаточно)
    const page2 = await request(api.users.search, {
      query: { q: 'вит', page: 2, limit: 5, sort: 'name', order: 'asc' },
    })

    expect(page2.page).toBe(2)
    expect(page2.limit).toBe(5)

    // Если total > limit, то на странице 2 обычно будут другие id
    if (page1.total > page1.limit) {
      const ids1 = new Set(page1.items.map((x) => x.id))
      const ids2 = new Set(page2.items.map((x) => x.id))
      // хотя бы один id должен отличаться
      const same = [...ids2].every((id) => ids1.has(id))
      expect(same).toBe(false)
    }
  })
})
