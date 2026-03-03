type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

let seq = 1
export function resetUserSeq() {
  seq = 1
}

function nextId() {
  return String(seq++)
}

function daysAgo(days: number) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

const names = ['Виталий', 'Анна', 'Илья', 'Ольга', 'Михаил', 'Екатерина', 'Денис', 'Мария']

export function makeUser(overrides?: Partial<User>): User {
  const id = overrides?.id ?? nextId()
  const name = overrides?.name ?? names[(Number(id) - 1) % names.length]
  const email = overrides?.email ?? `user${id}@example.com`
  const createdAt = overrides?.createdAt ?? daysAgo(30 - (Number(id) % 30))

  return { id, name, email, createdAt, ...overrides }
}

export function makeUsers(count = 25) {
  return Array.from({ length: count }, () => makeUser())
}

export type { User }
