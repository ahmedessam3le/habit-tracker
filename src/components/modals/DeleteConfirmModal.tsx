import Modal from './Modal'

interface DeleteConfirmModalProps {
  isOpen: boolean
  habitName: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmModal({
  isOpen,
  habitName,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Delete Habit">
      <p className="mb-6 text-sm text-zinc-400">
        Are you sure you want to delete{' '}
        <span className="font-semibold text-zinc-200">"{habitName}"</span>? This
        will remove all its history and cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}
