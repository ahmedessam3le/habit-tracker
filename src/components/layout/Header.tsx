interface HeaderProps {
  onAddHabit: () => void
}

export default function Header({ onAddHabit }: HeaderProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-100">Habit Tracker</h1>
          <p className="text-sm text-zinc-500">{today}</p>
        </div>
        <button
          onClick={onAddHabit}
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-400 active:bg-orange-600"
        >
          <span className="text-lg leading-none">+</span>
          Add Habit
        </button>
      </div>
    </header>
  )
}
