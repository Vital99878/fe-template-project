import '@testing-library/jest-dom/vitest'

import { afterAll, afterEach, beforeAll } from 'vitest'

import { initApi } from '@/app/providers/initApi'

import { server } from '@/shared/api/msw/server'
import { resetMswState } from '@/shared/api/msw/state'

beforeAll(() => {
  initApi()
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  resetMswState()
})

afterAll(() => server.close())
