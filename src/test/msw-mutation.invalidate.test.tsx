import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/api'
import { apiQueryKey, useApiMutation, useApiQuery } from '@/shared/api/reactQuery'

function createClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  })
}

function Profile() {
  const qc = useQueryClient()
  const me = useApiQuery(api.auth.me)

  const upd = useApiMutation(api.auth.updateMe, {
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: apiQueryKey(api.auth.me) })
    },
  })

  if (me.status !== 'success') return <div>loading</div>

  return (
    <div>
      <div data-testid="name">{me.data.name}</div>
      <button onClick={() => upd.mutate({ body: { name: 'Новое имя' } })}>Save</button>
    </div>
  )
}

describe('mutation + invalidation', () => {
  it('updates /me after PATCH 204 + invalidate', async () => {
    const user = userEvent.setup()
    const qc = createClient()

    render(
      <QueryClientProvider client={qc}>
        <Profile />
      </QueryClientProvider>,
    )

    // стартовое имя из MSW state
    expect(await screen.findByTestId('name')).toHaveTextContent('Виталий')

    await user.click(screen.getByText('Save'))

    // после invalidate query перезапросит /me и получит обновлённое
    expect(await screen.findByText('Новое имя')).toBeTruthy()
  })
})
