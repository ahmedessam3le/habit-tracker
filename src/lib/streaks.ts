import type { Habit, HabitLog, HabitStats } from '../types/habit'
import { todayKey, yesterdayKey, subtractDays, daysBetween } from './dates'

export function computeStats(habit: Habit, logs: HabitLog[]): HabitStats {
  const completedDates = new Set(
    logs.filter((l) => l.habitId === habit.id).map((l) => l.date),
  )

  const today = todayKey()
  const completedToday = completedDates.has(today)
  const totalCompletions = completedDates.size

  // Walk backwards from today (if done) or yesterday (if not yet done today).
  // This way, not having completed today doesn't break the streak.
  let currentStreak = 0
  let cursor = completedToday ? today : yesterdayKey()

  while (cursor >= habit.createdAt && completedDates.has(cursor)) {
    currentStreak++
    cursor = subtractDays(cursor, 1)
  }

  // Best streak: scan all sorted completion dates for the longest consecutive run.
  const sortedDates = Array.from(completedDates).sort()
  let maxRun = sortedDates.length > 0 ? 1 : 0
  let runLength = maxRun

  for (let i = 1; i < sortedDates.length; i++) {
    if (daysBetween(sortedDates[i - 1] as string, sortedDates[i] as string) === 1) {
      runLength++
      if (runLength > maxRun) maxRun = runLength
    } else {
      runLength = 1
    }
  }

  return {
    habitId: habit.id,
    currentStreak,
    bestStreak: Math.max(currentStreak, maxRun),
    completedToday,
    totalCompletions,
  }
}
