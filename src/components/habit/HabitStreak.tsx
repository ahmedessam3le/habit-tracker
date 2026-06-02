interface HabitStreakProps {
  current: number
  best: number
}

export default function HabitStreak({ current, best }: HabitStreakProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="flex items-center gap-1">
        <span className="text-base">🔥</span>
        <span className="font-semibold text-orange-400">{current}</span>
        <span className="text-zinc-500">day{current !== 1 ? 's' : ''}</span>
      </span>
      <span className="text-zinc-700">|</span>
      <span className="flex items-center gap-1">
        <span className="text-base">⭐</span>
        <span className="font-semibold text-zinc-300">{best}</span>
        <span className="text-zinc-500">best</span>
      </span>
    </div>
  )
}
