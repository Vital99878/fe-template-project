export function getString(url: URL, key: string) {
  const v = url.searchParams.get(key)
  return v == null || v.trim() === '' ? undefined : v
}

export function getInt(url: URL, key: string, opts?: { min?: number; max?: number }) {
  const raw = url.searchParams.get(key)
  if (raw == null || raw.trim() === '') return undefined
  const n = Number(raw)
  if (!Number.isFinite(n)) return undefined
  const i = Math.trunc(n)
  if (opts?.min != null && i < opts.min) return opts.min
  if (opts?.max != null && i > opts.max) return opts.max
  return i
}

export function getEnum<T extends ReadonlyArray<string>>(url: URL, key: string, allowed: T) {
  const v = url.searchParams.get(key)
  if (!v) return undefined
  return (allowed as ReadonlyArray<string>).includes(v) ? (v as T[number]) : undefined
}

// todo docs to this lib
