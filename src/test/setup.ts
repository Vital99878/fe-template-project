import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '@/shared/api/msw/server'
import { initApi } from '@/app/providers/initApi'
import { resetMswState } from '@/shared/api/msw/state'
import '@testing-library/jest-dom/vitest'

beforeAll(() => {
  initApi()
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  resetMswState()
})

afterAll(() => server.close())
