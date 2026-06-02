// All date operations use local time to avoid UTC-shift bugs.
// Never use date.toISOString() — it outputs UTC and shows the wrong date
// for users west of UTC after ~midnight local time.

export function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayKey(): string {
  return toDateKey(new Date())
}

export function yesterdayKey(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return toDateKey(d)
}

export function subtractDays(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split('-').map(Number)
  const date = new Date(y, (m as number) - 1, d as number)
  date.setDate(date.getDate() - days)
  return toDateKey(date)
}

export function lastNDays(n: number): string[] {
  const result: string[] = []
  for (let i = n - 1; i >= 0; i--) {
    result.push(subtractDays(todayKey(), i))
  }
  return result
}

export function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number)
  const [by, bm, bd] = b.split('-').map(Number)
  const dateA = new Date(ay, (am as number) - 1, ad as number)
  const dateB = new Date(by, (bm as number) - 1, bd as number)
  return Math.round(Math.abs(dateB.getTime() - dateA.getTime()) / 86400000)
}
