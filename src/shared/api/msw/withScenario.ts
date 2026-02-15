import { HttpResponse } from 'msw'
import { makeHandler } from './makeHandler'
import { resolveScenario } from './mockConfig'
import { forbidden, serverError, timeoutForever, unauthorized } from './responses'
import type { MockScenario } from './mockConfig'
import type { Endpoint } from '@/shared/api/endpoint'
import type { HttpHandler, HttpResponseResolver } from 'msw'

type ScenarioResolvers = Partial<Record<MockScenario, HttpResponseResolver>>

export function withScenario(
  endpoint: Endpoint<any, any, any, any>,
  resolvers: { happy: HttpResponseResolver } & ScenarioResolvers,
): HttpHandler {
  return makeHandler(endpoint, async (ctx) => {
    const scenario = resolveScenario(endpoint)

    // если для конкретного сценария задан кастом — используем
    const custom = resolvers[scenario]
    if (custom) return custom(ctx)

    // дефолтные сценарии (общие для всех)
    switch (scenario) {
      case 'happy':
        return resolvers.happy(ctx)

      case 'unauthorized':
        return unauthorized()

      case 'forbidden':
        return forbidden()

      case 'serverError':
        return serverError()

      case 'networkError':
        return HttpResponse.error()

      case 'timeout':
        return timeoutForever()
    }
  })
}
