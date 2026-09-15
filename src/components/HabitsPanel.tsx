import { useState } from 'react'
import { habitStreak, isHabitDue } from '../lib/dates'
import type { HabitFreq } from '../lib/types'
import { NumberPop } from './NumberPop'
import { usePlanner } from '../store/plannerStore'

export function HabitsPanel() {
  const habits = usePlanner((s) => s.habits)
  const day = usePlanner((s) => s.day)
  const addHabit = usePlanner((s) => s.addHabit)
  const toggleHabitToday = usePlanner((s) => s.toggleHabitToday)
  const removeHabit = usePlanner((s) => s.removeHabit)
  const [title, setTitle] = useState('')
  const [freq, setFreq] = useState<HabitFreq>('daily')

  return (
    <section className="panel habits-panel t-panel-reveal" data-state="in">
      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault()
          if (addHabit(title, freq)) setTitle('')
        }}
      >
        <label className="sr-only" htmlFor="habit-title">
          New habit
        </label>
        <input
          id="habit-title"
          data-testid="habit-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name a habit…"
          autoComplete="off"
        />
        <select value={freq} onChange={(e) => setFreq(e.target.value as HabitFreq)} aria-label="Frequency">
          <option value="daily">Daily</option>
          <option value="weekdays">Weekdays</option>
          <option value="weekly">Weekly</option>
        </select>
        <button type="submit" className="btn primary" data-testid="add-habit">
          Add
        </button>
      </form>

      <ul className="habit-list">
        {habits.length === 0 && <li className="empty-line">No habits yet — start with something small enough to keep.</li>}
        {habits.map((h) => {
          const done = h.completions.includes(day)
          const due = isHabitDue(h.freq, day, h.completions)
          const streak = habitStreak(h.completions, day)
          return (
            <li key={h.id} className={`habit-card ${done ? 'is-done' : ''}`} data-testid="habit-row">
              <button
                type="button"
                className={`habit-tick ${done ? 'is-checked' : ''}`}
                style={{ ['--habit' as string]: h.color }}
                aria-pressed={done}
                onClick={() => toggleHabitToday(h.id)}
                data-testid="habit-check"
              >
                <span className="tick-ring" />
                {done && <span className="tick-mark" />}
              </button>
              <div className="habit-body">
                <p className="habit-title">{h.title}</p>
                <p className="habit-meta">
                  <span>{h.freq}</span>
                  {!due && !done && <span className="soft">not due</span>}
                </p>
              </div>
              <div className="habit-streak" title="Streak">
                <span className="stat-label">Streak</span>
                <NumberPop value={streak} label="streak" />
              </div>
              <button type="button" className="btn tiny ghost" onClick={() => removeHabit(h.id)}>
                Remove
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
