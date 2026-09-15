import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { clearSnapshot, loadSnapshot, saveSnapshot } from '../lib/db'
import { todayISO } from '../lib/dates'
import { exportJson, parseImport } from '../lib/export'
import { makeSample } from '../lib/sample'
import type {
  AreaId,
  Habit,
  HabitFreq,
  JournalEntry,
  Mood,
  Priority,
  TabId,
  Task,
} from '../lib/types'

type Toast = { open: boolean; message: string; kind: 'ok' | 'err' }

type State = {
  loadStatus: 'boot' | 'loading' | 'ready' | 'error'
  tab: TabId
  day: string
  tasks: Task[]
  habits: Habit[]
  journal: JournalEntry[]
  toast: Toast
  showSuccess: boolean
  shakeTaskForm: boolean
  boot: () => Promise<void>
  setTab: (t: TabId) => void
  setDay: (d: string) => void
  persist: () => Promise<void>
  addTask: (title: string, area?: AreaId, priority?: Priority, due?: string | null) => boolean
  toggleTask: (id: string) => void
  removeTask: (id: string) => void
  addHabit: (title: string, freq?: HabitFreq) => boolean
  toggleHabitToday: (id: string) => void
  removeHabit: (id: string) => void
  saveMood: (mood: Mood, note: string) => boolean
  exportBackup: () => void
  importBackup: (text: string) => Promise<boolean>
  loadSample: () => Promise<void>
  resetAll: () => Promise<void>
  flashToast: (message: string, kind?: 'ok' | 'err') => void
  flashSuccess: () => void
}

async function write(get: () => State) {
  const s = get()
  await saveSnapshot({
    version: 1,
    seeded: true,
    tasks: s.tasks,
    habits: s.habits,
    journal: s.journal,
  })
}

export const usePlanner = create<State>((set, get) => ({
  loadStatus: 'boot',
  tab: 'today',
  day: todayISO(),
  tasks: [],
  habits: [],
  journal: [],
  toast: { open: false, message: '', kind: 'ok' },
  showSuccess: false,
  shakeTaskForm: false,

  boot: async () => {
    set({ loadStatus: 'loading' })
    try {
      const snap = await loadSnapshot()
      if (!snap) {
        const sample = makeSample()
        await saveSnapshot(sample)
        set({
          loadStatus: 'ready',
          tasks: sample.tasks,
          habits: sample.habits,
          journal: sample.journal,
          day: todayISO(),
        })
        return
      }
      set({
        loadStatus: 'ready',
        tasks: snap.tasks,
        habits: snap.habits,
        journal: snap.journal,
        day: todayISO(),
      })
    } catch {
      set({ loadStatus: 'error', tasks: makeSample().tasks, habits: [], journal: [] })
    }
  },

  setTab: (t) => set({ tab: t }),
  setDay: (d) => set({ day: d }),

  persist: async () => {
    try {
      await write(get)
    } catch {
      get().flashToast('Could not save to IndexedDB', 'err')
    }
  },

  addTask: (title, area = 'personal', priority = 3, due = null) => {
    const t = title.trim()
    if (!t) {
      set({ shakeTaskForm: true })
      setTimeout(() => set({ shakeTaskForm: false }), 450)
      get().flashToast('Task needs a title', 'err')
      return false
    }
    const task: Task = {
      id: nanoid(),
      title: t,
      notes: '',
      area,
      priority,
      due: due ?? get().day,
      done: false,
      doneAt: null,
      createdAt: new Date().toISOString(),
    }
    set((s) => ({ tasks: [task, ...s.tasks] }))
    void get().persist()
    get().flashToast('Task added')
    return true
  },

  toggleTask: (id) => {
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
              doneAt: !t.done ? new Date().toISOString() : null,
            }
          : t,
      ),
    }))
    void get().persist()
  },

  removeTask: (id) => {
    set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) }))
    void get().persist()
  },

  addHabit: (title, freq = 'daily') => {
    const t = title.trim()
    if (!t) {
      get().flashToast('Habit needs a name', 'err')
      return false
    }
    const colors = ['#3a9e94', '#a8893e', '#c45b4e', '#5a8f86', '#b08968']
    const habit: Habit = {
      id: nanoid(),
      title: t,
      freq,
      color: colors[get().habits.length % colors.length],
      createdAt: new Date().toISOString(),
      completions: [],
    }
    set((s) => ({ habits: [...s.habits, habit] }))
    void get().persist()
    get().flashToast('Habit started')
    return true
  },

  toggleHabitToday: (id) => {
    const day = get().day
    set((s) => ({
      habits: s.habits.map((h) => {
        if (h.id !== id) return h
        const has = h.completions.includes(day)
        return {
          ...h,
          completions: has
            ? h.completions.filter((c) => c !== day)
            : [...h.completions, day].sort(),
        }
      }),
    }))
    void get().persist()
  },

  removeHabit: (id) => {
    set((s) => ({ habits: s.habits.filter((h) => h.id !== id) }))
    void get().persist()
  },

  saveMood: (mood, note) => {
    const day = get().day
    const entry: JournalEntry = {
      id: nanoid(),
      date: day,
      mood,
      note: note.trim(),
      createdAt: new Date().toISOString(),
    }
    set((s) => ({
      journal: [entry, ...s.journal.filter((j) => j.date !== day)],
    }))
    void get().persist()
    get().flashToast('Mood logged')
    get().flashSuccess()
    return true
  },

  exportBackup: () => {
    const s = get()
    exportJson({
      version: 1,
      seeded: true,
      tasks: s.tasks,
      habits: s.habits,
      journal: s.journal,
    })
    get().flashSuccess()
    get().flashToast('Backup downloaded')
  },

  importBackup: async (text) => {
    try {
      const snap = parseImport(text)
      await saveSnapshot(snap)
      set({
        tasks: snap.tasks,
        habits: snap.habits,
        journal: snap.journal,
        loadStatus: 'ready',
      })
      get().flashToast('Backup restored')
      return true
    } catch {
      get().flashToast('Import failed — wrong file?', 'err')
      return false
    }
  },

  loadSample: async () => {
    const sample = makeSample()
    await saveSnapshot(sample)
    set({
      tasks: sample.tasks,
      habits: sample.habits,
      journal: sample.journal,
    })
    get().flashToast('Demo day loaded')
  },

  resetAll: async () => {
    await clearSnapshot()
    set({ tasks: [], habits: [], journal: [] })
    get().flashToast('Cleared local data')
  },

  flashToast: (message, kind = 'ok') => {
    set({ toast: { open: true, message, kind } })
    window.setTimeout(() => {
      set((s) => ({ toast: { ...s.toast, open: false } }))
    }, 2200)
  },

  flashSuccess: () => {
    set({ showSuccess: true })
    window.setTimeout(() => set({ showSuccess: false }), 900)
  },
}))
