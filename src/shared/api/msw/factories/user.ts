import { clampInt, hashToInt, isoNow, makeList, pick } from '../_utils'

export type User = {
  id: string
  name: string
  createdAt: string
}

const names = ['Виталий', 'Анна', 'Игорь', 'Мария', 'Денис', 'Олег', 'Ирина'] as const

export function makeUserById(id: string): User {
  const n = hashToInt(id)
  return {
    id,
    name: pick(names, n),
    createdAt: isoNow(-(n % 10) * 1440), // от 0 до 9 дней "назад"
  }
}

export function makeUsers(count = 10, seed = 'users'): Array<User> {
  const n = hashToInt(seed)
  return makeList(count, (i: number) => makeUserById(`${seed}-${n + i + 1}`))
}

export function searchUsers(params: { q?: string; limit?: number }): Array<User> {
  const q = (params.q ?? '').trim()
  const limit = clampInt(params.limit ?? 10, 0, 50)

  // базовый "каталог"
  const base = makeUsers(Math.max(limit, 25), q || 'catalog')

  // фильтрация "как будто по бэку"
  const filtered = q
    ? base.filter(
        (u) =>
          u.name.toLowerCase().includes(q.toLowerCase()) ||
          u.id.toLowerCase().includes(q.toLowerCase()),
      )
    : base

  return filtered.slice(0, limit)
}

/** /me: чуть стабильнее и “реалистичнее” */
export function makeMe(overrides?: Partial<User>): User {
  return {
    ...makeUserById('1'),
    name: 'Виталий',
    ...overrides,
  }
}
