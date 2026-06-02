import { HabitProvider } from './context/HabitContext'
import AppShell from './components/layout/AppShell'

export default function App() {
  return (
    <HabitProvider>
      <AppShell />
    </HabitProvider>
  )
}
