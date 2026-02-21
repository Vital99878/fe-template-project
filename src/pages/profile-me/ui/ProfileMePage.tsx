import { api } from '@/shared/api'
import { apiQueryKey, useApiQuery } from '@/shared/api/reactQuery'
import { Button, Field, Input, LinkAsButton, Textarea } from '@/shared/ui'
import { PageQueryGuard } from '@/shared/ui/blocks/'

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
          <Field label={'О себе'} hint={'Пара предложений'}>
            <Textarea />
          </Field>
        </div>
      )}
    </PageQueryGuard>
  )
}
