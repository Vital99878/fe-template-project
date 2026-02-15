import { beforeAll, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HttpResponse } from 'msw'

import { api } from '@/shared/api'
import { useApiQuery } from '@/shared/api/reactQuery'
import { server } from '@/shared/api/msw/server'
import { makeHandler } from '@/shared/api/msw/makeHandler'
import { initApi } from '@/app/providers/initApi'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  })
}

function MeError() {
  const q = useApiQuery(api.auth.me)

  if (q.status === 'pending') return <div>loading</div>
  if (q.status === 'error') {
    // q.error должен быть AppError
    return (
      <div>
        <div>code: {q.error.code}</div>
        <div>status: {q.error.status ?? 'n/a'}</div>
        <div>message: {q.error.message}</div>
      </div>
    )
  }

  return <div>success</div>
}

beforeAll(() => {
  // Важно: подключаем интерсепторы один раз (чтобы ошибки нормализовались в AppError)
  initApi()
})

describe('MSW + React Query (error)', () => {
  it('maps 500 response to AppError', async () => {
    // Переопределяем handler только для этого теста: /me => 500
    server.use(
      makeHandler(api.auth.me, () => {
        return HttpResponse.json(
          { message: 'Backend exploded' },
          { status: 500, headers: { 'x-request-id': 'req-1' } },
        )
      }),
    )

    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <MeError />
      </QueryClientProvider>,
    )

    expect(screen.getByText('loading')).toBeTruthy()

    // Проверяем, что в error попал AppError с правильным кодом/статусом
    const code = await screen.findByText('code: HTTP_ERROR')
    expect(code).toBeTruthy()

    const status = screen.getByText('status: 500')
    expect(status).toBeTruthy()

    // message берётся из response.data.message (см. normalizeError)
    const msg = screen.getByText('message: Backend exploded')
    expect(msg).toBeTruthy()
  })
})
