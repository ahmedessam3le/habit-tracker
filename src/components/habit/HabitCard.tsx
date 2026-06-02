import { useState } from 'react'
import type { Habit, HabitStats } from '../../types/habit'
import HabitStreak from './HabitStreak'
import WeekView from './WeekView'
import DeleteConfirmModal from '../modals/DeleteConfirmModal'

interface HabitCardProps {
  habit: Habit
  stats: HabitStats
  onToggle: () => void
  onDelete: () => void
}

export default function HabitCard({ habit, stats, onToggle, onDelete }: HabitCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { completedToday, currentStreak, bestStreak } = stats

  return (
    <>
      <div
        className={[
          'group rounded-2xl border bg-zinc-900 p-4 transition-all',
          completedToday
            ? 'border-emerald-800 border-l-2 border-l-emerald-500'
            : 'border-zinc-800',
        ].join(' ')}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            aria-label={completedToday ? 'Unmark habit' : 'Mark habit as done'}
            className={[
              'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all',
              completedToday
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : 'border-zinc-600 bg-transparent hover:border-emerald-400',
            ].join(' ')}
          >
            {completedToday && (
              <svg viewBox="0 0 12 10" fill="none" className="h-3 w-3">
                <path
                  d="M1 5l3.5 3.5L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p
                  className={[
                    'font-semibold leading-snug',
                    completedToday ? 'text-emerald-300' : 'text-zinc-100',
                  ].join(' ')}
                >
                  {habit.name}
                </p>
                {habit.description && (
                  <p className="mt-0.5 text-sm text-zinc-500">{habit.description}</p>
                )}
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                aria-label="Delete habit"
                className="shrink-0 rounded-lg p-1 text-zinc-700 opacity-0 transition-all hover:bg-zinc-800 hover:text-zinc-400 group-hover:opacity-100"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66H14.5a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Z" />
                </svg>
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <WeekView habitId={habit.id} createdAt={habit.createdAt} />
              <HabitStreak current={currentStreak} best={bestStreak} />
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        habitName={habit.name}
        onConfirm={() => {
          setShowDeleteModal(false)
          onDelete()
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  )
}
