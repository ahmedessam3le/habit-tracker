import { useHabits } from '../../context/HabitContext'
import { lastNDays, todayKey } from '../../lib/dates'

interface WeekViewProps {
  habitId: string
  createdAt: string
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function WeekView({ habitId, createdAt }: WeekViewProps) {
  const { logs } = useHabits()
  const days = lastNDays(7)
  const today = todayKey()

  const completedSet = new Set(
    logs.filter((l) => l.habitId === habitId).map((l) => l.date),
  )

  return (
    <div className="flex items-center gap-1.5">
      {days.map((day, i) => {
        const beforeCreation = day < createdAt
        const isToday = day === today
        const done = completedSet.has(day)

        // Compute which day-of-week label to show
        const [y, m, d] = day.split('-').map(Number)
        const date = new Date(y, (m as number) - 1, d as number)
        const label = DAY_LABELS[date.getDay()] ?? ''

        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-zinc-600">{label}</span>
            <div
              className={[
                'h-3 w-3 rounded-full',
                beforeCreation
                  ? 'bg-zinc-800'
                  : done
                    ? 'bg-emerald-500'
                    : isToday
                      ? 'border border-zinc-500 bg-transparent'
                      : 'border border-zinc-700 bg-transparent',
              ].join(' ')}
            />
          </div>
        )
      })}
    </div>
  )
}
