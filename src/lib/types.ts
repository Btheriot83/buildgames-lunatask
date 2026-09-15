export type AreaId = 'personal' | 'work' | 'home' | 'health'

export type Priority = 1 | 2 | 3 | 4

export type Task = {
  id: string
  title: string
  notes: string
  area: AreaId
  priority: Priority
  due: string | null // YYYY-MM-DD
  done: boolean
  doneAt: string | null
  createdAt: string
}

export type HabitFreq = 'daily' | 'weekdays' | 'weekly'

export type Habit = {
  id: string
  title: string
  freq: HabitFreq
  color: string
  createdAt: string
  /** ISO date strings when completed */
  completions: string[]
}

export type Mood = 1 | 2 | 3 | 4 | 5

export type JournalEntry = {
  id: string
  date: string // YYYY-MM-DD
  mood: Mood
  note: string
  createdAt: string
}

export type TabId = 'today' | 'tasks' | 'habits' | 'mood'

export type Snapshot = {
  version: 1
  tasks: Task[]
  habits: Habit[]
  journal: JournalEntry[]
  seeded: boolean
}
