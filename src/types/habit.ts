export interface Habit {
  id: string
  name: string
  description?: string
  createdAt: string // "YYYY-MM-DD" local time
}

export interface HabitLog {
  habitId: string
  date: string // "YYYY-MM-DD" local time
}

export interface HabitStats {
  habitId: string
  currentStreak: number
  bestStreak: number
  completedToday: boolean
  totalCompletions: number
}

export interface PersistedState {
  habits: Habit[]
  logs: HabitLog[]
}

export interface HabitContextValue {
  habits: Habit[]
  logs: HabitLog[]
  stats: Record<string, HabitStats>
  todayCompletionPercent: number
  addHabit: (name: string, description?: string) => void
  deleteHabit: (id: string) => void
  toggleToday: (habitId: string) => void
}
