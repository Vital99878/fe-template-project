import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '@/shared/api/msw/server'

// В тестах лучше "error", чтобы тест падал, если забыли handler. :contentReference[oaicite:6]{index=6}
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
