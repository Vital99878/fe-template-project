import '@testing-library/jest-dom/vitest'

import { afterAll, afterEach, beforeAll } from 'vitest'

import { initApi } from '@/app/providers/initApi'

import { resetMswState, server } from '@/shared/api/msw'

beforeAll(() => {
  initApi()
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  resetMswState()
})

afterAll(() => server.close())
