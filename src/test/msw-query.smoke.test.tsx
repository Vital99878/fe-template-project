import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { api } from '@/shared/api'
import { useApiQuery } from '@/shared/api/reactQuery'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  })
}

function Me() {
  const q = useApiQuery(api.auth.me)

  if (q.status === 'pending') return <div>loading</div>
  if (q.status === 'error') return <div>error: {q.error.code}</div>

  return <div>{q.data.name}</div>
}

describe('MSW + React Query', () => {
  it('returns mocked /me data', async () => {
    const qc = createTestQueryClient()

    render(
      <QueryClientProvider client={qc}>
        <Me />
      </QueryClientProvider>,
    )

    // loading сначала
    expect(screen.getByText('loading')).toBeTruthy()

    // потом приходит мок-ответ из MSW handlers
    const el = await screen.findByText('Виталий')
    expect(el).toBeTruthy()
  })
})
