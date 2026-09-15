import { useEffect, useState } from 'react'
import { scrollToSection } from './TabsNav'
import { usePlanner } from '../store/plannerStore'

const KEY = 'tideglass-walk-done'

const CARDS = [
  {
    title: 'Today is the desk',
    body: 'One blotter. Scroll for Tasks, Habits, Mood.',
    cta: 'Got it',
    action: () => scrollToSection('today'),
  },
  {
    title: 'Check something off',
    body: 'Tap a habit on Today. That is enough.',
    cta: 'Show me Today',
    action: () => scrollToSection('today'),
  },
  {
    title: 'Add one thing',
    body: 'Type under Today. Tasks holds the rest.',
    cta: 'Open Tasks',
    action: () => scrollToSection('tasks'),
  },
] as const

export function FriendWalkthrough() {
  const loadStatus = usePlanner((s) => s.loadStatus)
  const [step, setStep] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (loadStatus !== 'ready') return
    try {
      if (localStorage.getItem(KEY) === '1') return
      setOpen(true)
    } catch {
      /* ignore */
    }
  }, [loadStatus])

  if (!open) return null
  const card = CARDS[step]
  if (!card) return null

  const finish = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  const next = () => {
    card.action()
    if (step >= CARDS.length - 1) finish()
    else setStep((s) => s + 1)
  }

  return (
    <div className="friend-walk" data-testid="friend-walk" role="dialog" aria-label="Harbor walkthrough">
      <div className="friend-walk-card">
        <p className="friend-walk-progress">
          {step + 1} of {CARDS.length}
        </p>
        <h3 className="friend-walk-title">{card.title}</h3>
        <p className="friend-walk-body">{card.body}</p>
        <div className="friend-walk-actions">
          <button type="button" className="btn ghost" onClick={finish} data-testid="walk-skip">
            Skip
          </button>
          <button type="button" className="btn primary" onClick={next} data-testid="walk-next">
            {card.cta}
          </button>
        </div>
      </div>
    </div>
  )
}
