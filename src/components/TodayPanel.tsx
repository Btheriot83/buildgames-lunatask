import { useEffect, useState } from 'react'
import { COPY, WEATHER } from '../lib/copy'
import { GROUP_CLOCK, clockLabel, formatDayParts, groupToday, nowBucket } from '../lib/todayGroups'
import type { Priority } from '../lib/types'
import { TaskRow } from './TaskRow'
import { usePlanner } from '../store/plannerStore'

function prioForNow(): Priority {
  const b = nowBucket()
  if (b === 'tide') return 1
  if (b === 'later') return 2
  return 3
}

export function TodayPanel() {
  const day = usePlanner((s) => s.day)
  const tasks = usePlanner((s) => s.tasks)
  const habits = usePlanner((s) => s.habits)
  const journal = usePlanner((s) => s.journal)
  const toggleHabitToday = usePlanner((s) => s.toggleHabitToday)
  const addTask = usePlanner((s) => s.addTask)
  const [now, setNow] = useState(() => new Date())
  const [draft, setDraft] = useState('')

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])

  const groups = groupToday(tasks, habits, day)
  const mood = journal.find((j) => j.date === day)
  const parts = formatDayParts(day)
  const barren = groups.every((g) => g.tasks.length === 0 && g.habits.length === 0)
  const here = nowBucket(now)

  return (
    <section className="today-ledger t-panel-reveal" data-state="in" data-testid="today-ledger">
      <header className="today-mast">
        <h2 className="today-date">{COPY.today}</h2>
        <p className="today-weather">
          <span>
            {parts.weekday} {parts.dayNum}
            {mood ? ` · ${WEATHER[mood.mood]}` : ''}
          </span>
          <span className="today-clock">{clockLabel(now)}</span>
        </p>
      </header>

      {barren && <p className="empty-line today-empty">{COPY.empty}</p>}

      <div className="day-timeline">
        {groups.map((g) => {
          if (g.tasks.length === 0 && g.habits.length === 0) return null
          const isNow = here === g.id
          return (
            <section
              key={g.id}
              className={`today-group group-${g.id} ${isNow ? 'is-now' : ''}`}
              data-testid={`group-${g.id}`}
            >
              <div className="group-rail" aria-hidden="true">
                <span className="group-time">{GROUP_CLOCK[g.id]}</span>
                {isNow && <span className="now-flag">{COPY.now}</span>}
              </div>
              <div className="group-body">
                <h3 className="today-group-label">{g.label}</h3>
                {isNow && <div className="now-hairline" />}
                <ul className="today-list">
                  {g.tasks.map((t) => (
                    <TaskRow key={t.id} task={t} quiet />
                  ))}
                  {g.habits.map((h) => {
                    const done = h.completions.includes(day)
                    return (
                      <li key={h.id} className={`habit-line ${done ? 'is-done' : ''}`}>
                        <button
                          type="button"
                          className={`habit-tick ${done ? 'is-checked' : ''}`}
                          style={{ ['--habit' as string]: h.color }}
                          aria-pressed={done}
                          onClick={() => toggleHabitToday(h.id)}
                          data-testid="today-habit-check"
                        >
                          <span className="tick-ring" />
                          {done && <span className="tick-mark" />}
                        </button>
                        <div className="habit-body">
                          <p className="habit-title">{h.title}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
          )
        })}
      </div>

      <form
        className="today-add"
        onSubmit={(e) => {
          e.preventDefault()
          if (addTask(draft, 'personal', prioForNow(), day)) setDraft('')
        }}
      >
        <label className="sr-only" htmlFor="today-add">
          {COPY.addToday}
        </label>
        <input
          id="today-add"
          data-testid="today-add"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={COPY.addToday}
          autoComplete="off"
        />
      </form>
    </section>
  )
}
