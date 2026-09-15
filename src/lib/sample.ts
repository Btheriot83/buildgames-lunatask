import { nanoid } from 'nanoid'
import { addDays, todayISO } from './dates'
import type { Snapshot } from './types'

export function makeSample(now = new Date()): Snapshot {
  const today = todayISO(now)
  const yesterday = addDays(today, -1)
  const twoAgo = addDays(today, -2)

  return {
    version: 1,
    seeded: true,
    tasks: [
      {
        id: nanoid(),
        title: 'Draft Tideglass README notes',
        notes: 'Sample task — delete anytime.',
        area: 'work',
        priority: 2,
        due: today,
        done: false,
        doneAt: null,
        createdAt: new Date(now.getTime() - 86_400_000).toISOString(),
      },
      {
        id: nanoid(),
        title: 'Water the ferns',
        notes: '',
        area: 'home',
        priority: 3,
        due: today,
        done: false,
        doneAt: null,
        createdAt: new Date(now.getTime() - 172_800_000).toISOString(),
      },
      {
        id: nanoid(),
        title: 'Book dentist (sample)',
        notes: 'Low urgency sample.',
        area: 'health',
        priority: 4,
        due: addDays(today, 3),
        done: false,
        doneAt: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: nanoid(),
        title: 'Evening stretch',
        notes: '',
        area: 'personal',
        priority: 3,
        due: yesterday,
        done: true,
        doneAt: yesterday + 'T20:00:00.000Z',
        createdAt: yesterday + 'T08:00:00.000Z',
      },
    ],
    habits: [
      {
        id: nanoid(),
        title: 'Morning pages',
        freq: 'daily',
        color: '#5bd5c8',
        createdAt: twoAgo + 'T08:00:00.000Z',
        completions: [twoAgo, yesterday],
      },
      {
        id: nanoid(),
        title: 'Walk 20 min',
        freq: 'weekdays',
        color: '#c4a35a',
        createdAt: twoAgo + 'T08:00:00.000Z',
        completions: [yesterday],
      },
      {
        id: nanoid(),
        title: 'Inbox zero pass',
        freq: 'weekly',
        color: '#e06b5b',
        createdAt: twoAgo + 'T08:00:00.000Z',
        completions: [],
      },
    ],
    journal: [
      {
        id: nanoid(),
        date: yesterday,
        mood: 4,
        note: 'Sample check-in: steady tide, short walk after lunch.',
        createdAt: yesterday + 'T21:00:00.000Z',
      },
    ],
  }
}
