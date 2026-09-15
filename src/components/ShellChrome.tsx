import { useRef } from 'react'
import { NumberPop } from './NumberPop'
import { habitStreak, todayISO } from '../lib/dates'
import { usePlanner } from '../store/plannerStore'

export function ShellChrome() {
  const exportBackup = usePlanner((s) => s.exportBackup)
  const importBackup = usePlanner((s) => s.importBackup)
  const loadSample = usePlanner((s) => s.loadSample)
  const resetAll = usePlanner((s) => s.resetAll)
  const habits = usePlanner((s) => s.habits)
  const tasks = usePlanner((s) => s.tasks)
  const fileRef = useRef<HTMLInputElement>(null)

  const openTasks = tasks.filter((t) => !t.done).length
  const bestStreak = Math.max(0, ...habits.map((h) => habitStreak(h.completions, todayISO())))

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
        <div className="desk-meter">
          <span className="stat-label">Open</span>
          <NumberPop value={openTasks} label="open tasks" />
        </div>
        <div className="desk-meter">
          <span className="stat-label">Best streak</span>
          <NumberPop value={bestStreak} label="best streak" />
        </div>
      </div>
      <div className="chrome-actions">
        <button type="button" className="btn ghost" onClick={() => void loadSample()}>
          Sample
        </button>
        <button type="button" className="btn ghost" onClick={() => fileRef.current?.click()}>
          Import
        </button>
        <button type="button" className="btn primary" onClick={exportBackup} data-testid="export-btn">
          Export
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
