import { resetUsersDb } from '@/shared/api/msw/db/usersDb'

import type { User } from './factories/user'
import { makeUser } from './factories/user'

const STORAGE_KEY = 'msw:state:me'

let me: User = loadFromStorage() ?? makeUser()

function loadFromStorage(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function saveToStorage() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(me))
  } catch {
    // ignore
  }
}

export function getMe(): User {
  return me
}

export function patchMe(patch: Partial<User>): User {
  me = { ...me, ...patch }
  saveToStorage()
  return me
}

export function setMe(next: User): User {
  me = next
  saveToStorage()
  return me
}

export function resetMswState(): void {
  me = makeUser()
  saveToStorage()
  resetUsersDb(40)
}
