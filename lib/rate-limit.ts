const store = new Map<string, { count: number; reset: number }>()

export function rateLimit(key: string, limit = 3, windowMs = 60_000): { ok: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)
  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs })
    return { ok: true, remaining: limit - 1 }
  }
  entry.count++
  if (entry.count > limit) return { ok: false, remaining: 0 }
  return { ok: true, remaining: limit - entry.count }
}
