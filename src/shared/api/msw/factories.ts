export function makeMe(overrides?: Partial<{ id: string; name: string }>) {
  return {
    id: '1',
    name: 'Виталий',
    ...overrides,
  }
}
