import type { User } from '@/shared/api/msw'
import { makeUsers, resetUserSeq } from '@/shared/api/msw'

let users: Array<User> = []

export function resetUsersDb(seedCount = 25) {
  resetUserSeq()
  users = makeUsers(seedCount)
}

export function getUserById(id: string) {
  return users.find((u) => u.id === id)
}

type SearchArgs = {
  q?: string
  page?: number
  limit?: number
  sort?: 'name' | 'createdAt'
  order?: 'asc' | 'desc'
}

export function searchUsers({
  q,
  page = 1,
  limit = 10,
  sort = 'createdAt',
  order = 'desc',
}: SearchArgs) {
  const query = q?.toLowerCase()

  let items = users.slice()

  if (query) {
    items = items.filter(
      (u) => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query),
    )
  }

  items.sort((a, b) => {
    const av = sort === 'name' ? a.name : a.createdAt
    const bv = sort === 'name' ? b.name : b.createdAt
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return order === 'asc' ? cmp : -cmp
  })

  const total = items.length
  const start = (page - 1) * limit
  const paged = items.slice(start, start + limit)

  return { items: paged, page, limit, total }
}
