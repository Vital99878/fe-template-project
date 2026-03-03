# MSW

MSW (Mock Service Worker) перехватывает реальные HTTP-запросы (axios/fetch) и возвращает ответы из моков.  
В проекте MSW используется:

- в **dev** (браузер) — через Service Worker
- в **Vitest** — через Node server

---

## Где что лежит

- Handlers: `src/shared/api/msw/handlers.ts`
- Сценарии: `src/shared/api/msw/withScenario.ts`
- Ответы: `src/shared/api/msw/responses.ts`
- Парсинг query params: `src/shared/api/msw/lib/query.ts`
- Factories: `src/shared/api/msw/factories/*`
- Mini-DB (stateful данные): `src/shared/api/msw/db/*`
- Сброс состояния моков: `src/shared/api/msw/state.ts` (функция `resetMswState`)

---

## Как добавить новый эндпоинт

1. Добавить эндпоинт в registry (`src/shared/api/endpoints.*`).
2. Добавить handler в `handlers.ts`:

```ts
withScenario(api.some.endpoint, {
  happy: () => jsonOk(),
})
```
