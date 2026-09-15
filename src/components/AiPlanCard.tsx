import { useState } from 'react'
import { fetchDailyPlan, type DailyPlan } from '../lib/dailyPlan'
import { habitStreak, isHabitDue } from '../lib/dates'
import { usePlanner } from '../store/plannerStore'

export function AiPlanCard() {
  const day = usePlanner((s) => s.day)
  const tasks = usePlanner((s) => s.tasks)
  const habits = usePlanner((s) => s.habits)
  const journal = usePlanner((s) => s.journal)
  const addTask = usePlanner((s) => s.addTask)
  const addHabit = usePlanner((s) => s.addHabit)
  const flashToast = usePlanner((s) => s.flashToast)
  const [plan, setPlan] = useState<DailyPlan | null>(null)
  const [busy, setBusy] = useState(false)

  const mood = journal.find((j) => j.date === day)

  const run = async () => {
    setBusy(true)
    try {
      const next = await fetchDailyPlan({
        day,
        mood: mood?.mood ?? null,
        moodNote: mood?.note,
        tasks: tasks.map((t) => ({
          title: t.title,
          priority: t.priority,
          due: t.due,
          done: t.done,
        })),
        habits: habits.map((h) => ({
          title: h.title,
          freq: h.freq,
          streak: habitStreak(h.completions, day),
          dueToday: isHabitDue(h.freq, day, h.completions),
        })),
      })
      setPlan(next)
      flashToast('Day plan ready')
    } catch (e) {
      flashToast(e instanceof Error ? e.message : 'Plan failed', 'err')
    } finally {
      setBusy(false)
    }
  }

  const apply = () => {
    if (!plan) return
    let n = 0
    for (const title of plan.orderedTasks) {
      if (addTask(title, 'personal', 2, day)) n += 1
    }
    for (const title of plan.habitSuggestions) {
      if (!habits.some((h) => h.title.toLowerCase() === title.toLowerCase())) {
        if (addHabit(title, 'daily')) n += 1
      }
    }
    flashToast(n ? `Added ${n} from plan` : 'Nothing new to add')
  }

  return (
    <article className={`desk-card ai-plan-card ${busy ? 'is-busy' : ''}`} data-testid="ai-plan-card">
      <header className="card-head">
        <div>
          <p className="ai-kicker">After the triad</p>
          <h3>Order the day</h3>
        </div>
        <button
          type="button"
          className="btn tiny secondary"
          data-testid="plan-day"
          disabled={busy}
          onClick={() => void run()}
        >
          {busy ? 'Planning…' : 'Plan the tide'}
        </button>
      </header>
      {!plan && (
        <p className="empty-line">
          Reads open slips, due habits, and today’s weather. Returns a do-order from the server.
        </p>
      )}
      {plan && (
        <div className="ai-plan-body t-panel-reveal" data-state="in">
          <p className="ai-focus">{plan.focus}</p>
          <h4 className="section-label">Do-order</h4>
          <ol className="ai-list">
            {plan.orderedTasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          {plan.habitSuggestions.length > 0 && (
            <>
              <h4 className="section-label">Protect</h4>
              <ul className="ai-list plain">
                {plan.habitSuggestions.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </>
          )}
          {plan.note && <p className="ai-note">{plan.note}</p>}
          <div className="ai-actions">
            <button type="button" className="btn secondary" data-testid="apply-plan" onClick={apply}>
              Pin plan to blotter
            </button>
            <span className="ai-meta">
              {plan.provider} · {plan.model}
            </span>
          </div>
        </div>
      )}
    </article>
  )
}
