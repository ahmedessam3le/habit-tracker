import type { PersistedState } from '../types/habit'
import { STORAGE_KEY } from '../constants/storage'
import { subtractDays, todayKey } from './dates'

const EMPTY: PersistedState = { habits: [], logs: [] }

export function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    return JSON.parse(raw) as PersistedState
  } catch {
    return EMPTY
  }
}

export function saveState(state: PersistedState): void {
  try {
    // Prune logs older than 365 days to keep localStorage lean.
    const cutoff = subtractDays(todayKey(), 365)
    const prunedLogs = state.logs.filter((l) => l.date >= cutoff)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, logs: prunedLogs }))
  } catch {
    // Silently ignore quota errors.
  }
}
