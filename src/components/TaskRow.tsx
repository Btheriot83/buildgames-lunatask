import type { Task } from '../lib/types'
import { usePlanner } from '../store/plannerStore'

const AREA: Record<Task['area'], string> = {
  personal: 'Personal',
  work: 'Work',
  home: 'Home',
  health: 'Health',
}

export function TaskRow({ task }: { task: Task }) {
  const toggleTask = usePlanner((s) => s.toggleTask)
  const removeTask = usePlanner((s) => s.removeTask)

  return (
    <li className={`task-row ${task.done ? 'is-done' : ''}`} data-testid="task-row">
      <button
        type="button"
        className={`t-checkbox-check check ${task.done ? 'is-checked' : ''}`}
        aria-pressed={task.done}
        aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}
        onClick={() => toggleTask(task.id)}
        data-testid="task-check"
      >
        <span className="check-mark" />
      </button>
      <div className="task-body">
        <p className="task-title">{task.title}</p>
        <p className="task-meta">
          <span className={`prio p${task.priority}`}>P{task.priority}</span>
          <span>{AREA[task.area]}</span>
          {task.due && <span className="due">{task.due}</span>}
        </p>
      </div>
      <button type="button" className="btn tiny ghost" onClick={() => removeTask(task.id)} aria-label="Delete task">
        Remove
      </button>
    </li>
  )
}
