import { usePlanner } from '../store/plannerStore'

export function Toast() {
  const toast = usePlanner((s) => s.toast)
  return (
    <div
      className={`t-toast app-toast ${toast.open ? 'is-open' : ''} kind-${toast.kind}`}
      role="status"
      aria-live="polite"
    >
      {toast.message}
    </div>
  )
}
