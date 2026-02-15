import {
  getMockConfig,
  resetMockConfig,
  setDefaultScenario,
  setEndpointScenario,
} from './mockConfig'
import { getMe, resetMswState, setMe } from './state'
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

    state: {
      getMe: () => getMe(),
      setMe: (next: any) => setMe(next),
      reset: () => resetMswState(),
    },
    api,
  }
}
