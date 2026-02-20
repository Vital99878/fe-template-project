import { api } from '@/shared/api'
import { apiQueryKey, useApiQuery } from '@/shared/api/reactQuery'
import { PageQueryGuard } from '@/shared/ui/PageQueryGuard/PageQueryGuard'
import { Button, LinkAsButton } from '@/shared/ui/button/index'
import { Input } from '@/shared/ui/input/Input'
import { Field } from '@/shared/ui/field/Field'

export function ProfileMePage() {
  const queryKey = apiQueryKey(api.auth.me)
  const q = useApiQuery(api.auth.me)

  return (
    <PageQueryGuard
      query={q}
      queryKey={queryKey}
      loading={<div className="text-muted p-6 text-sm">Загрузка…</div>}
    >
      {(data) => (
        <div>
          <p>{data.name}</p>
          <Button variant={'primary'}>Primary</Button>
          <Button variant={'secondary'}>Secondary</Button>
          <Button variant={'ghost'}>Ghost</Button>
          <Button variant={'danger'}>Danger</Button>
          <LinkAsButton to={'/'} variant={'secondary'}>
            LinkAsButton to Main
          </LinkAsButton>

          <Field label={'some'}>
            <Input uiSize={'lg'} />
          </Field>
        </div>
      )}
    </PageQueryGuard>
  )
}
