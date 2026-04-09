import { api } from '@/shared/api'
import { apiQueryKey, useApiQuery } from '@/shared/api/reactQuery'
import { Button, Field, Input, Textarea } from '@/shared/ui'
import { PageQueryGuard } from '@/shared/ui/blocks/'
import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

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

          <Field label={'some'}>
            <Input uiSize={'lg'} />
          </Field>
          <Field label={'О себе'} hint={'Пара предложений'}>
            <Textarea />
          </Field>

          <Button isLoading={true}>Сохранение…</Button>

          <Card className="max-w-md">
            <CardHeader>
              <Skeleton className="h-4 w-80" />
              <Skeleton className="mt-2 h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        </div>
      )}
    </PageQueryGuard>
  )
}
