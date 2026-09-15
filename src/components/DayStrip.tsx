import { todayISO, weekStrip } from '../lib/dates'
import { usePlanner } from '../store/plannerStore'

export function DayStrip() {
  const day = usePlanner((s) => s.day)
  const setDay = usePlanner((s) => s.setDay)
  const days = weekStrip(todayISO())

  return (
    <section className="day-strip day-strip-quiet" aria-label="Day picker">
      <div className="day-chips" role="listbox" aria-label="Week">
        {days.map((d) => {
          const [y, m, dd] = d.split('-').map(Number)
          const label = new Date(y, m - 1, dd).toLocaleDateString(undefined, { weekday: 'short' })
          const selected = d === day
          const isToday = d === todayISO()
          return (
            <button
              key={d}
              type="button"
              role="option"
              aria-selected={selected}
              className={`day-chip ${selected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`}
              onClick={() => setDay(d)}
            >
              <span className="dow">{label}</span>
              <span className="dom">{dd}</span>
            </button>
          )
        })}
      </div>
      {day !== todayISO() && (
        <button type="button" className="btn tiny jump-today" onClick={() => setDay(todayISO())}>
          Jump to today
        </button>
      )}
    </section>
  )
}
