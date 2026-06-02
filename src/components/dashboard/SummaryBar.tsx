import { useHabits } from '../../context/HabitContext'

export default function SummaryBar() {
  const { habits, stats, todayCompletionPercent } = useHabits()

  const doneCount = Object.values(stats).filter((s) => s.completedToday).length
  const totalCount = habits.length
  const allDone = totalCount > 0 && doneCount === totalCount

  const topStreak = Math.max(0, ...Object.values(stats).map((s) => s.currentStreak))

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">Today's Progress</p>
          <p className="mt-1 text-2xl font-bold text-zinc-100">
            {doneCount}
            <span className="text-zinc-500">/{totalCount}</span>
            <span className="ml-2 text-base font-normal text-zinc-400">habits done</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-400">Top Streak</p>
          <p className="mt-1 text-2xl font-bold text-orange-400">
            {topStreak}
            <span className="ml-1 text-sm font-normal text-zinc-400">days</span>
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={[
            'h-full rounded-full transition-all duration-500',
            allDone ? 'bg-emerald-400' : 'bg-orange-500',
          ].join(' ')}
          style={{ width: `${todayCompletionPercent}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-zinc-600">
        <span>0%</span>
        {allDone ? (
          <span className="font-semibold text-emerald-400">All done! 🎉</span>
        ) : (
          <span>{todayCompletionPercent}%</span>
        )}
        <span>100%</span>
      </div>
    </div>
  )
}
