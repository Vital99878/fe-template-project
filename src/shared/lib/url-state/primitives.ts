// src/shared/lib/url-state/primitives.ts
export function parseString(value: string | null, fallback: string) {
  return value ?? fallback
}

export function parseIntPositive(value: string | null, fallback: number) {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback
}

export function parseEnum<T extends ReadonlyArray<string>>(
  value: string | null,
  allowed: T,
  fallback: T[number],
): T[number] {
  return (allowed as ReadonlyArray<string>).includes(value ?? '') ? (value as T[number]) : fallback
}

export function parseNumberEnum<T extends ReadonlyArray<number>>(
  value: string | null,
  allowed: T,
  fallback: T[number],
): T[number] {
  const n = Number(value)
  return (allowed as ReadonlyArray<number>).includes(n) ? (n as T[number]) : fallback
}
