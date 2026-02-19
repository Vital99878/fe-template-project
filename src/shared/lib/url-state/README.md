# url-state

Typed URL state for pages (query params) based on `react-router-dom` `useSearchParams`.

## Why

- URL is a reproducible state: refresh-safe and shareable.
- Avoid `params.get()` scattered across UI.
- Single place for parsing, validation, defaults and serialization.

## Rules

- ❌ Do not use `params.get()` in components.
- ✅ Each page (or view) owns a `*UrlState.ts` codec.
- ✅ Defaults are applied in `parse()`.
- ✅ `serialize()` omits default values (keeps URLs clean).
- ✅ Use `normalize()` to reset derived params (e.g. `page=1` when filters change).
- Prefer `{ replace: true }` to avoid spamming browser history for filters/search.

---

## Example: users list

### 1) Define URL state and codec

```ts
// src/pages/users/model/usersListUrlState.ts
import { parseEnum, parseIntPositive, parseNumberEnum } from '@/shared/lib/url-state'

export type UsersListUrlState = {
  q: string
  status: 'all' | 'active' | 'blocked'
  sort: 'createdAt_desc' | 'createdAt_asc'
  page: number
  limit: 20 | 50 | 100
}

const DEFAULT: UsersListUrlState = {
  q: '',
  status: 'all',
  sort: 'createdAt_desc',
  page: 1,
  limit: 20,
}

const STATUS = ['all', 'active', 'blocked'] as const
const SORT = ['createdAt_desc', 'createdAt_asc'] as const
const LIMIT = [20, 50, 100] as const

export const usersListUrlCodec = {
  parse(params: URLSearchParams): UsersListUrlState {
    return {
      q: params.get('q') ?? DEFAULT.q,
      status: parseEnum(params.get('status'), STATUS, DEFAULT.status),
      sort: parseEnum(params.get('sort'), SORT, DEFAULT.sort),
      page: parseIntPositive(params.get('page'), DEFAULT.page),
      limit: parseNumberEnum(params.get('limit'), LIMIT, DEFAULT.limit),
    }
  },

  serialize(state: UsersListUrlState): URLSearchParams {
    const p = new URLSearchParams()

    if (state.q !== DEFAULT.q) p.set('q', state.q)
    if (state.status !== DEFAULT.status) p.set('status', state.status)
    if (state.sort !== DEFAULT.sort) p.set('sort', state.sort)
    if (state.page !== DEFAULT.page) p.set('page', String(state.page))
    if (state.limit !== DEFAULT.limit) p.set('limit', String(state.limit))

    return p
  },
}
```
