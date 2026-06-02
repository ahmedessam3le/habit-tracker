import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Habit, HabitContextValue, HabitLog, HabitStats } from '../types/habit'
import { loadState, saveState } from '../lib/storage'
import { computeStats } from '../lib/streaks'
import { todayKey } from '../lib/dates'

const HabitContext = createContext<HabitContextValue | null>(null)

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const initialState = loadState()
  const [habits, setHabits] = useState<Habit[]>(initialState.habits)
  const [logs, setLogs] = useState<HabitLog[]>(initialState.logs)

  useEffect(() => {
    saveState({ habits, logs })
  }, [habits, logs])

  const stats = useMemo<Record<string, HabitStats>>(() => {
    return Object.fromEntries(habits.map((h) => [h.id, computeStats(h, logs)]))
  }, [habits, logs])

  const todayCompletionPercent = useMemo(() => {
    if (habits.length === 0) return 0
    const done = Object.values(stats).filter((s) => s.completedToday).length
    return Math.round((done / habits.length) * 100)
  }, [habits, stats])

  function addHabit(name: string, description?: string) {
    const habit: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description?.trim() || undefined,
      createdAt: todayKey(),
    }
    setHabits((prev) => [...prev, habit])
  }

  function deleteHabit(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id))
    setLogs((prev) => prev.filter((l) => l.habitId !== id))
  }

  function toggleToday(habitId: string) {
    const today = todayKey()
    const exists = logs.some((l) => l.habitId === habitId && l.date === today)
    if (exists) {
      setLogs((prev) => prev.filter((l) => !(l.habitId === habitId && l.date === today)))
    } else {
      setLogs((prev) => [...prev, { habitId, date: today }])
    }
  }

  return (
    <HabitContext.Provider
      value={{ habits, logs, stats, todayCompletionPercent, addHabit, deleteHabit, toggleToday }}
    >
      {children}
    </HabitContext.Provider>
  )
}

export function useHabits(): HabitContextValue {
  const ctx = useContext(HabitContext)
  if (!ctx) throw new Error('useHabits must be used inside HabitProvider')
  return ctx
}
