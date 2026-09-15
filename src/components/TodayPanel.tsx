import { COPY, WEATHER } from '../lib/copy'
import { GROUP_CLOCK, clockLabel, formatDayParts, groupToday, nowBucket } from '../lib/todayGroups'
import { TaskRow } from './TaskRow'
import { usePlanner } from '../store/plannerStore'

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
  const here = nowBucket()

  return (
    <section className="today-ledger t-panel-reveal" data-state="in" data-testid="today-ledger">
      <header className="today-mast">
        <p className="today-kicker">{COPY.today}</p>
        <h2 className="today-date">
          {parts.weekday} {parts.dayNum}
        </h2>
        <p className="today-weather">
          {mood ? WEATHER[mood.mood] : COPY.weatherEmpty}
          <span className="today-clock">{clockLabel()}</span>
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
    </section>
  )
}
