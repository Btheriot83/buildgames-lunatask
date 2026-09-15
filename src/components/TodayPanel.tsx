import { habitStreak, isHabitDue } from '../lib/dates'
import { NumberPop } from './NumberPop'
import { TaskRow } from './TaskRow'
import { usePlanner } from '../store/plannerStore'

export function TodayPanel() {
  const day = usePlanner((s) => s.day)
  const tasks = usePlanner((s) => s.tasks)
  const habits = usePlanner((s) => s.habits)
  const journal = usePlanner((s) => s.journal)
  const toggleHabitToday = usePlanner((s) => s.toggleHabitToday)
  const setTab = usePlanner((s) => s.setTab)

  const dueTasks = tasks
    .filter((t) => !t.done && (t.due === day || (t.due && t.due < day)))
    .sort((a, b) => a.priority - b.priority)
  const dueHabits = habits.filter((h) => isHabitDue(h.freq, day, h.completions))
  const mood = journal.find((j) => j.date === day)
  const doneHabits = dueHabits.filter((h) => h.completions.includes(day)).length

  return (
    <section className="panel today-panel t-panel-reveal" data-state="in">
      <div className="today-grid">
        <article className="glass-card">
          <header className="card-head">
            <h3>Focus</h3>
            <button type="button" className="btn tiny ghost" onClick={() => setTab('tasks')}>
              All tasks
            </button>
          </header>
          <ul className="task-list compact">
            {dueTasks.length === 0 && (
              <li className="empty-line">Clear water — no open tasks due this day.</li>
            )}
            {dueTasks.slice(0, 6).map((t) => (
              <TaskRow key={t.id} task={t} />
            ))}
          </ul>
        </article>

        <article className="glass-card">
          <header className="card-head">
            <h3>Habits</h3>
            <span className="inline-stat">
              <NumberPop value={doneHabits} /> / {dueHabits.length}
            </span>
          </header>
          <ul className="habit-list compact">
            {dueHabits.length === 0 && <li className="empty-line">Nothing due on this day.</li>}
            {dueHabits.map((h) => {
              const done = h.completions.includes(day)
              const streak = habitStreak(h.completions, day)
              return (
                <li key={h.id} className={`habit-card mini ${done ? 'is-done' : ''}`}>
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
                    <p className="habit-meta">
                      streak <NumberPop value={streak} />
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </article>

        <article className="glass-card mood-glance">
          <header className="card-head">
            <h3>Mood</h3>
            <button type="button" className="btn tiny ghost" onClick={() => setTab('mood')}>
              Check in
            </button>
          </header>
          {mood ? (
            <div className="mood-glance-body">
              <span className={`mood-dot lg m${mood.mood}`}>{mood.mood}</span>
              <p>{mood.note || 'Logged without a note.'}</p>
            </div>
          ) : (
            <p className="empty-line">No check-in for this day yet.</p>
          )}
        </article>
      </div>
    </section>
  )
}
