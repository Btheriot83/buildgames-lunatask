import { useRef } from 'react'
import { NumberPop } from './NumberPop'
import { habitStreak, isHabitDue, todayISO } from '../lib/dates'
import { usePlanner } from '../store/plannerStore'

export function ShellChrome() {
  const exportBackup = usePlanner((s) => s.exportBackup)
  const importBackup = usePlanner((s) => s.importBackup)
  const loadSample = usePlanner((s) => s.loadSample)
  const resetAll = usePlanner((s) => s.resetAll)
  const habits = usePlanner((s) => s.habits)
  const tasks = usePlanner((s) => s.tasks)
  const journal = usePlanner((s) => s.journal)
  const day = usePlanner((s) => s.day)
  const setTab = usePlanner((s) => s.setTab)
  const fileRef = useRef<HTMLInputElement>(null)

  const dueToday = tasks.filter((t) => !t.done && (t.due === day || (t.due && t.due < day))).length
  const dueHabits = habits.filter((h) => isHabitDue(h.freq, day, h.completions))
  const doneHabits = dueHabits.filter((h) => h.completions.includes(day)).length
  const bestStreak = Math.max(0, ...habits.map((h) => habitStreak(h.completions, todayISO())))
  const mood = journal.find((j) => j.date === day)

  return (
    <header className="shell-chrome">
      <div className="brand-block">
        <div className="brand-mark-row">
          <img
            className="brand-bottle"
            src="/imagine/empty-tide-desk.jpg"
            alt=""
            width={72}
            height={72}
          />
          <div>
            <p className="eyebrow">Harbor desk</p>
            <h1 className="brand-title">Tideglass</h1>
          </div>
        </div>
        <p className="brand-sub">Today’s water level — tasks, habits, mood. Stays on this device.</p>
      </div>
      <div className="desk-meters" aria-label="Day meters">
        <div className="desk-meter has-badge">
          <span className="stat-label">Tasks due</span>
          <NumberPop value={dueToday} label="tasks due" />
          <span className="t-badge" data-open={dueToday > 0 ? 'true' : 'false'} aria-hidden="true">
            <span className="t-badge-dot">{dueToday > 9 ? '9+' : dueToday}</span>
          </span>
        </div>
        <div className="desk-meter">
          <span className="stat-label">Habits done</span>
          <span className="desk-meter-frac">
            <NumberPop value={doneHabits} />/{dueHabits.length}
          </span>
        </div>
        <div className="desk-meter">
          <span className="stat-label">Mood</span>
          {mood ? (
            <span className={`mood-dot lg m${mood.mood}`}>{mood.mood}</span>
          ) : (
            <button type="button" className="btn tiny primary" onClick={() => setTab('mood')}>
              Log
            </button>
          )}
        </div>
        <div className="desk-meter soft-meter">
          <span className="stat-label">Best streak</span>
          <NumberPop value={bestStreak} label="best streak" />
        </div>
      </div>
      <div className="chrome-actions">
        <button type="button" className="btn primary" onClick={() => setTab('today')} data-testid="go-today">
          Open Today
        </button>
        <button type="button" className="btn secondary" onClick={exportBackup} data-testid="export-btn">
          Export
        </button>
        <button type="button" className="btn secondary" onClick={() => fileRef.current?.click()}>
          Import
        </button>
        <button type="button" className="btn tiny ghost" onClick={() => void loadSample()} title="Load a believable demo day">
          Demo day
        </button>
        <button
          type="button"
          className="btn danger-ghost"
          onClick={() => {
            if (confirm('Clear all Tideglass data on this device?')) void resetAll()
          }}
        >
          Clear
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (!f) return
            const reader = new FileReader()
            reader.onload = () => {
              void importBackup(String(reader.result ?? ''))
            }
            reader.readAsText(f)
            e.target.value = ''
          }}
        />
      </div>
    </header>
  )
}
