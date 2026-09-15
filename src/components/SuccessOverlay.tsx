import { usePlanner } from '../store/plannerStore'

export function SuccessOverlay() {
  const show = usePlanner((s) => s.showSuccess)
  return (
    <div className={`success-overlay ${show ? 'visible' : ''}`} aria-hidden={!show}>
      <span className="t-success-check" data-state={show ? 'in' : 'out'}>
        <svg viewBox="0 0 48 48" width="72" height="72" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" stroke="#5bd5c8" strokeWidth="3" />
          <path
            d="M14 24.5 L21 31.5 L34 16"
            stroke="#5bd5c8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p>Saved</p>
    </div>
  )
}
