import { useMemo, useState } from 'react'
import type { Mood } from '../lib/types'
import { usePlanner } from '../store/plannerStore'

const MOODS: { v: Mood; label: string }[] = [
  { v: 1, label: 'Rough' },
  { v: 2, label: 'Low' },
  { v: 3, label: 'Okay' },
  { v: 4, label: 'Good' },
  { v: 5, label: 'Bright' },
]

export function MoodPanel() {
  const day = usePlanner((s) => s.day)
  const journal = usePlanner((s) => s.journal)
  const saveMood = usePlanner((s) => s.saveMood)
  const existing = useMemo(() => journal.find((j) => j.date === day), [journal, day])
  const [mood, setMood] = useState<Mood>(existing?.mood ?? 3)
  const [note, setNote] = useState(existing?.note ?? '')

  return (
    <section className="panel mood-panel t-panel-reveal" data-state="in">
      <p className="lead">How is the tide today?</p>
      <div className="mood-row" role="radiogroup" aria-label="Mood">
        {MOODS.map((m) => (
          <button
            key={m.v}
            type="button"
            role="radio"
            aria-checked={mood === m.v}
            className={`mood-chip m${m.v} ${mood === m.v ? 'is-selected' : ''}`}
            onClick={() => setMood(m.v)}
            data-testid={`mood-${m.v}`}
          >
            <span className="mood-num">{m.v}</span>
            <span className="mood-label">{m.label}</span>
          </button>
        ))}
      </div>
      <label className="note-label" htmlFor="mood-note">
        Short note
      </label>
      <textarea
        id="mood-note"
        data-testid="mood-note"
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional — one honest sentence."
      />
      <button
        type="button"
        className="btn primary"
        data-testid="save-mood"
        onClick={() => saveMood(mood, note)}
      >
        Log check-in
      </button>

      <h3 className="section-label">Recent</h3>
      <ul className="journal-list">
        {journal.length === 0 && <li className="empty-line">No check-ins yet.</li>}
        {journal.slice(0, 8).map((j) => (
          <li key={j.id} className="journal-row">
            <span className={`mood-dot m${j.mood}`}>{j.mood}</span>
            <div>
              <p className="j-date">{j.date}</p>
              <p className="j-note">{j.note || '—'}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
