import type { Endpoint } from '@/shared/api/endpoint'

export type MockScenario =
  | 'happy'
  | 'unauthorized'
  | 'forbidden'
  | 'serverError'
  | 'networkError'
  | 'timeout'

export type EndpointKey = string

export type MockConfig = {
  defaultScenario: MockScenario
  endpoints: Record<EndpointKey, MockScenario>
}

const STORAGE_KEY = 'msw:config'

const defaultConfig: MockConfig = {
  defaultScenario: 'happy',
  endpoints: {},
}

let config: MockConfig = loadFromStorage() ?? defaultConfig

function loadFromStorage(): MockConfig | null {
  // в тестах/SSR localStorage может отсутствовать
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as MockConfig
  } catch {
    return null
  }
}

function saveToStorage() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch {
    // ignore
  }
}

export function endpointKey(endpoint: Endpoint<any, any, any, any>): EndpointKey {
  return `${endpoint.method} ${endpoint.path}`
}

export function getMockConfig(): MockConfig {
  return config
}

export function setMockConfig(next: MockConfig) {
  config = next
  saveToStorage()
}

export function resetMockConfig() {
  config = { ...defaultConfig }
  saveToStorage()
}

export function setDefaultScenario(s: MockScenario) {
  config = { ...config, defaultScenario: s }
  saveToStorage()
}

export function setEndpointScenario(endpoint: Endpoint<any, any, any, any>, s?: MockScenario) {
  const key = endpointKey(endpoint)
  const endpoints = { ...config.endpoints }

  if (!s) delete endpoints[key]
  else endpoints[key] = s

  config = { ...config, endpoints }
  saveToStorage()
}

export function resolveScenario(endpoint: Endpoint<any, any, any, any>): MockScenario {
  const key = endpointKey(endpoint)
  return config.endpoints[key] ?? config.defaultScenario
}
