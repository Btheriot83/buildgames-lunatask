import { isHabitDue } from './dates'
import type { Habit, Task } from './types'

export type TodayBucket = 'tide' | 'later' | 'evening'

export const TODAY_GROUPS: { id: TodayBucket; label: string }[] = [
  { id: 'tide', label: 'This tide' },
  { id: 'later', label: 'Later' },
  { id: 'evening', label: 'This evening' },
]

export function bucketForTask(task: Task, day: string): TodayBucket {
  if (task.due && task.due < day) return 'tide'
  if (task.priority <= 1) return 'tide'
  if (task.priority === 2) return 'later'
  return 'evening'
}

export function bucketForHabit(habit: Habit): TodayBucket {
  const t = habit.title.toLowerCase()
  if (/bed|stretch|evening|night/.test(t)) return 'evening'
  if (/inbox|zero|weekly/.test(t)) return 'later'
  return 'tide'
}

export function formatDayParts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return {
    weekday: dt.toLocaleDateString(undefined, { weekday: 'long' }),
    month: dt.toLocaleDateString(undefined, { month: 'short' }),
    dayNum: String(d),
  }
}

export function clockLabel(now = new Date()) {
  return now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

/** 0–1 position of now across a waking day (6:00–24:00). */
export function nowRail(now = new Date()) {
  const h = now.getHours() + now.getMinutes() / 60
  const start = 6
  const end = 24
  const t = (h - start) / (end - start)
  return Math.min(1, Math.max(0, t))
}

export function groupToday(tasks: Task[], habits: Habit[], day: string) {
  const dueTasks = tasks
    .filter((t) => !t.done && (t.due === day || (t.due && t.due < day)))
    .sort((a, b) => a.priority - b.priority)
  const dueHabits = habits.filter((h) => isHabitDue(h.freq, day, h.completions))

  return TODAY_GROUPS.map((g) => ({
    ...g,
    tasks: dueTasks.filter((t) => bucketForTask(t, day) === g.id),
    habits: dueHabits.filter((h) => bucketForHabit(h) === g.id),
  }))
}
