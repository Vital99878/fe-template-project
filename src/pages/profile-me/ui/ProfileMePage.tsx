import { api } from '@/shared/api'
import { apiQueryKey, useApiQuery } from '@/shared/api/reactQuery'

export function ProfileMePage() {
  const meKey = apiQueryKey(api.auth.me)
  const q = useApiQuery(api.auth.me)

  if (q.status === 'pending') return <div>loading…</div>

  if (q.status === 'error') {
    // даём boundary возможность сделать retry точечно
    throw Object.assign(q.error, { __queryKey: meKey })
  }

  return <div>{q.data.name}</div>
}
