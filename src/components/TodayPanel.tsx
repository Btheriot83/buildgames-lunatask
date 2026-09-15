import { habitStreak } from '../lib/dates'
import { clockLabel, formatDayParts, groupToday } from '../lib/todayGroups'
import { TaskRow } from './TaskRow'
import { NumberPop } from './NumberPop'
import { usePlanner } from '../store/plannerStore'

const WEATHER = ['', 'Rough', 'Low', 'Okay', 'Good', 'Bright']

export function TodayPanel() {
  const day = usePlanner((s) => s.day)
  const tasks = usePlanner((s) => s.tasks)
  const habits = usePlanner((s) => s.habits)
  const journal = usePlanner((s) => s.journal)
  const toggleHabitToday = usePlanner((s) => s.toggleHabitToday)

  const groups = groupToday(tasks, habits, day)
  const mood = journal.find((j) => j.date === day)
  const parts = formatDayParts(day)
  const barren = groups.every((g) => g.tasks.length === 0 && g.habits.length === 0)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(day + 'T12:00:00')
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })

  return (
    <section className="today-ledger t-panel-reveal" data-state="in" data-testid="today-ledger">
      <header className="today-mast">
        <p className="today-kicker">Today</p>
        <h2 className="today-date">
          {parts.weekday} {parts.dayNum}
        </h2>
        <p className="today-weather">
          {mood ? (
            <>
              {WEATHER[mood.mood]}
              {mood.note ? ` · ${mood.note}` : ''}
            </>
          ) : (
            'No weather yet.'
          )}
          <span className="today-clock">{clockLabel()}</span>
        </p>
      </header>

      {barren && <p className="empty-line today-empty">Still water.</p>}

      {groups.map((g) => {
        if (g.tasks.length === 0 && g.habits.length === 0) return null
        return (
          <section key={g.id} className={`today-group group-${g.id}`} data-testid={`group-${g.id}`}>
            <h3 className="today-group-label">{g.label}</h3>
            <ul className="today-list">
              {g.tasks.map((t) => (
                <TaskRow key={t.id} task={t} quiet />
              ))}
              {g.habits.map((h) => {
                const done = h.completions.includes(day)
                const streak = habitStreak(h.completions, day)
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
                      <div className="habit-meta-row">
                        <div className="heat-week heat-week-lg" aria-hidden="true">
                          {weekDays.map((d) => (
                            <span
                              key={d}
                              className={`heat-cell ${h.completions.includes(d) ? 'on' : ''} ${d === day && h.completions.includes(d) ? 'is-today' : ''}`}
                            />
                          ))}
                        </div>
                        <p className="habit-meta">
                          streak <NumberPop value={streak} />
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </section>
  )
}
