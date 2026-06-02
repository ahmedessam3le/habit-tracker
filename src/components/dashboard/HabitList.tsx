import { useHabits } from '../../context/HabitContext'
import HabitCard from '../habit/HabitCard'

export default function HabitList() {
  const { habits, stats, toggleToday, deleteHabit } = useHabits()

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          stats={stats[habit.id] ?? { habitId: habit.id, currentStreak: 0, bestStreak: 0, completedToday: false, totalCompletions: 0 }}
          onToggle={() => toggleToday(habit.id)}
          onDelete={() => deleteHabit(habit.id)}
        />
      ))}
    </div>
  )
}
