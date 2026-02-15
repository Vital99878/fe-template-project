import {
  getMockConfig,
  resetMockConfig,
  setDefaultScenario,
  setEndpointScenario,
} from './mockConfig'
import type { MockScenario } from './mockConfig'
import { api } from '@/shared/api/endpoints'

export function exposeMswDevTools() {
  if (!import.meta.env.DEV) return
  ;(window as any).__msw = {
    get: () => getMockConfig(),
    reset: () => resetMockConfig(),
    setDefault: (s: MockScenario) => setDefaultScenario(s),
    setEndpoint: (endpoint: any, s?: MockScenario) => setEndpointScenario(endpoint, s),

    // удобные ярлыки для твоих эндпоинтов
    api,
  }
}
