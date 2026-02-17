import { api } from '@/shared/api'
import { apiQueryKey, useApiQuery } from '@/shared/api/reactQuery'
import { PageQueryGuard } from '@/shared/ui/PageQueryGuard/PageQueryGuard'

export function ProfileMePage() {
  const queryKey = apiQueryKey(api.auth.me)
  const q = useApiQuery(api.auth.me)

  return (
    <PageQueryGuard
      query={q}
      queryKey={queryKey}
      loading={<div className="text-muted p-6 text-sm">Загрузка…</div>}
    >
      {(data) => <div>{data.name}</div>}
    </PageQueryGuard>
  )
}
