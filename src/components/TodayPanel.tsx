import { habitStreak, isHabitDue } from '../lib/dates'
import { AiPlanCard } from './AiPlanCard'
import { EmptyHarbor } from './EmptyHarbor'
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
  const barren = dueTasks.length === 0 && dueHabits.length === 0 && !mood
  const habitPct = dueHabits.length ? Math.round((doneHabits / dueHabits.length) * 100) : 0

  return (
    <section className="panel today-panel t-panel-reveal" data-state="in">
      <div className="job-banner" data-testid="job-banner">
        <div className="job-banner-copy">
          <p className="job-eyebrow">Today’s desk</p>
          <h2 className="job-title">Tasks · Habits · Mood</h2>
          <p className="job-sub">Check tasks, tick habits, log mood — then ask AI to order the rest.</p>
        </div>
        <div className="job-meters" aria-label="Today progress">
          <div className="job-meter">
            <span className="stat-label">Tasks open</span>
            <NumberPop value={dueTasks.length} />
          </div>
          <div className="job-meter">
            <span className="stat-label">Habits</span>
            <span className="job-meter-frac">
              <NumberPop value={doneHabits} />/{dueHabits.length}
            </span>
          </div>
          <div className="job-meter">
            <span className="stat-label">Mood</span>
            {mood ? (
              <span className={`mood-dot lg m${mood.mood}`}>{mood.mood}</span>
            ) : (
              <span className="job-meter-empty">—</span>
            )}
          </div>
        </div>
        {dueHabits.length > 0 && (
          <div className="job-progress" aria-hidden="true">
            <div className="job-progress-fill" style={{ width: `${habitPct}%` }} />
          </div>
        )}
      </div>

      {barren && (
        <EmptyHarbor
          showVideo
          title="Quiet water"
          body="No slips or habits due. Capture a task, start a habit, or log mood — the three things this desk is for."
        />
      )}

      <div className="today-grid job-triad" data-testid="job-triad">
        <article className="desk-card job-card">
          <header className="card-head">
            <h3>Tasks</h3>
            <button type="button" className="btn tiny ghost" onClick={() => setTab('tasks')}>
              All tasks
            </button>
          </header>
          <ul className="task-list compact">
            {dueTasks.length === 0 && (
              <li className="empty-line">No tasks due. Capture one on the Tasks tab.</li>
            )}
            {dueTasks.slice(0, 6).map((t) => (
              <TaskRow key={t.id} task={t} />
            ))}
          </ul>
        </article>

        <article className="desk-card job-card">
          <header className="card-head">
            <h3>Habits</h3>
            <span className="inline-stat">
              <NumberPop value={doneHabits} /> / {dueHabits.length}
            </span>
          </header>
          <ul className="habit-list compact">
            {dueHabits.length === 0 && <li className="empty-line">No habits due on this tide.</li>}
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

        <article className="desk-card mood-glance job-card">
          <header className="card-head">
            <h3>Mood</h3>
            <button type="button" className="btn tiny ghost" onClick={() => setTab('mood')}>
              Check in
            </button>
          </header>
          {mood ? (
            <div className="mood-glance-body">
              <span className={`mood-dot lg m${mood.mood}`}>{mood.mood}</span>
              <div>
                <p className="mood-glance-label">
                  {['', 'Rough', 'Low', 'Okay', 'Good', 'Bright'][mood.mood]}
                </p>
                <p>{mood.note || 'Logged without a note.'}</p>
              </div>
            </div>
          ) : (
            <p className="empty-line">No mood logged for this day yet. Tap Check in.</p>
          )}
        </article>
      </div>

      <AiPlanCard />
    </section>
  )
}
