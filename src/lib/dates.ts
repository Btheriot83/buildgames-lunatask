export function todayISO(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() + n)
  return todayISO(dt)
}

export function formatDayLabel(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return dt.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

export function weekdayIndex(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).getDay() // 0 Sun
}

export function isHabitDue(freq: 'daily' | 'weekdays' | 'weekly', iso: string, completions: string[]): boolean {
  if (freq === 'daily') return true
  if (freq === 'weekdays') {
    const w = weekdayIndex(iso)
    return w >= 1 && w <= 5
  }
  // weekly: due if not completed in last 7 days ending today
  const weekStart = addDays(iso, -6)
  return !completions.some((c) => c >= weekStart && c <= iso)
}

/** Consecutive daily streak ending on `iso` (or yesterday if not done today). */
export function habitStreak(completions: string[], iso: string): number {
  const set = new Set(completions)
  let cursor = set.has(iso) ? iso : addDays(iso, -1)
  if (!set.has(cursor)) return 0
  let streak = 0
  while (set.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function weekStrip(center: string): string[] {
  return Array.from({ length: 7 }, (_, i) => addDays(center, i - 3))
}
