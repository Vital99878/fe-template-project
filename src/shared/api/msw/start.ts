export async function startMsw() {
  if (!import.meta.env.DEV) return
  if (import.meta.env.VITE_MSW !== 'on') return

  const { worker } = await import('@/shared/api/msw/browser')

  // В dev удобно "warn", чтобы видеть что не замокано
  return worker.start({ onUnhandledRequest: 'warn' })
}
