import { useState } from 'react'
import Header from './Header'
import Dashboard from '../dashboard/Dashboard'
import AddHabitModal from '../modals/AddHabitModal'
import { useHabits } from '../../context/HabitContext'

export default function AppShell() {
  const [showAddModal, setShowAddModal] = useState(false)
  const { addHabit } = useHabits()

  function handleAdd(name: string, description?: string) {
    addHabit(name, description)
    setShowAddModal(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header onAddHabit={() => setShowAddModal(true)} />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Dashboard onAddHabit={() => setShowAddModal(true)} />
      </main>
      <AddHabitModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAdd}
      />
    </div>
  )
}
