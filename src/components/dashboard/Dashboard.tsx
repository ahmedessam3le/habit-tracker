import { useHabits } from '../../context/HabitContext'
import SummaryBar from './SummaryBar'
import HabitList from './HabitList'

interface DashboardProps {
  onAddHabit: () => void
}

export default function Dashboard({ onAddHabit }: DashboardProps) {
  const { habits } = useHabits()

  return (
    <div className="flex flex-col gap-5">
      {habits.length > 0 && <SummaryBar />}

      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-20 text-center">
          <div className="mb-4 text-6xl">🌱</div>
          <h2 className="text-lg font-semibold text-zinc-300">No habits yet</h2>
          <p className="mt-1 mb-6 text-sm text-zinc-500">
            Start building better habits, one day at a time.
          </p>
          <button
            onClick={onAddHabit}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
          >
            <span className="text-lg leading-none">+</span>
            Add your first habit
          </button>
        </div>
      ) : (
        <HabitList />
      )}
    </div>
  )
}
