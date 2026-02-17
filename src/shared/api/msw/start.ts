import { exposeMswDevTools } from './devTools'
import { resetUsersDb } from '@/shared/api/msw/db/usersDb'

export async function startMsw() {
  if (!import.meta.env.DEV) return
  if (import.meta.env.VITE_MSW !== 'on') return

  const { worker } = await import('@/shared/api/msw/browser')

  exposeMswDevTools()
  resetUsersDb(40)
  // В dev удобно "warn", чтобы видеть что не замокано
  return worker.start({ onUnhandledRequest: 'warn' })
}
