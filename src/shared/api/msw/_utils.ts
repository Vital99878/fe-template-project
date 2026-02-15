let seq = 1

export function nextId(prefix = 'id') {
  return `${prefix}-${seq++}`
}

/**
 * Детерминированный "базовый" момент времени, чтобы моки не плавали
 * и тесты были стабильные.
 */
const base = new Date('2026-02-15T10:00:00.000Z')

export function isoNow(offsetMinutes = 0) {
  const d = new Date(base)
  d.setMinutes(d.getMinutes() + offsetMinutes)
  return d.toISOString()
}

export function pick<T>(arr: ReadonlyArray<T>, index: number) {
  return arr[index % arr.length]
}

export function makeList<T>(count: number, factory: (i: number) => T) {
  return Array.from({ length: count }, (_, i) => factory(i))
}

/**
 * Простейший стабильный хэш строки → число.
 * Нужен, чтобы по id/q получать одинаковые имена/данные.
 */
export function hashToInt(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function clampInt(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, Math.trunc(value)))
}

/** Полезно для тестов: если где-то используешь nextId() */
export function resetSeq() {
  seq = 1
}
