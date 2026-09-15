import { useState } from 'react'
import type { AreaId, Priority } from '../lib/types'
import { TaskRow } from './TaskRow'
import { usePlanner } from '../store/plannerStore'

export function TasksPanel() {
  const tasks = usePlanner((s) => s.tasks)
  const day = usePlanner((s) => s.day)
  const addTask = usePlanner((s) => s.addTask)
  const shake = usePlanner((s) => s.shakeTaskForm)
  const [title, setTitle] = useState('')
  const [area, setArea] = useState<AreaId>('personal')
  const [priority, setPriority] = useState<Priority>(3)

  const open = tasks.filter((t) => !t.done)
  const done = tasks.filter((t) => t.done)

  return (
    <section className="panel tasks-panel t-panel-reveal" data-state="in">
      <form
        className={`composer ${shake ? 't-error-state-shake is-shaking' : ''}`}
        onSubmit={(e) => {
          e.preventDefault()
          if (addTask(title, area, priority, day)) setTitle('')
        }}
      >
        <label className="sr-only" htmlFor="task-title">
          New task
        </label>
        <input
          id="task-title"
          data-testid="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task for today…"
          autoComplete="off"
        />
        <select value={area} onChange={(e) => setArea(e.target.value as AreaId)} aria-label="Area">
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
          <option value="health">Health</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value) as Priority)}
          aria-label="Priority"
        >
          <option value={1}>P1</option>
          <option value={2}>P2</option>
          <option value={3}>P3</option>
          <option value={4}>P4</option>
        </select>
        <button type="submit" className="btn primary" data-testid="add-task">
          Add
        </button>
      </form>

      <h3 className="section-label">Open</h3>
      <ul className="task-list">
        {open.length === 0 && <li className="empty-line">No open tasks — add one above.</li>}
        {open
          .slice()
          .sort((a, b) => a.priority - b.priority)
          .map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
      </ul>

      {done.length > 0 && (
        <>
          <h3 className="section-label muted">Done</h3>
          <ul className="task-list done-list">
            {done.map((t) => (
              <TaskRow key={t.id} task={t} />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
