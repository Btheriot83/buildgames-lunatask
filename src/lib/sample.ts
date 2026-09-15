import { nanoid } from 'nanoid'
import { addDays, todayISO } from './dates'
import type { Snapshot } from './types'

/** Believable harbor-desk day — no SAMPLE / lorem / placeholder labels. */
export function makeSample(now = new Date()): Snapshot {
  const today = todayISO(now)
  const yesterday = addDays(today, -1)
  const twoAgo = addDays(today, -2)
  const threeAgo = addDays(today, -3)
  const fourAgo = addDays(today, -4)

  return {
    version: 1,
    seeded: true,
    tasks: [
      {
        id: nanoid(),
        title: 'Reply to marina slip renewal',
        notes: 'Ask about winter rate before Friday.',
        area: 'work',
        priority: 1,
        due: today,
        done: false,
        doneAt: null,
        createdAt: new Date(now.getTime() - 86_400_000).toISOString(),
      },
      {
        id: nanoid(),
        title: 'Pick up brass fasteners at Harbor Hardware',
        notes: '',
        area: 'home',
        priority: 2,
        due: today,
        done: false,
        doneAt: null,
        createdAt: new Date(now.getTime() - 172_800_000).toISOString(),
      },
      {
        id: nanoid(),
        title: 'Pack thermos + tide chart for afternoon walk',
        notes: '',
        area: 'personal',
        priority: 3,
        due: today,
        done: false,
        doneAt: null,
        createdAt: new Date(now.getTime() - 50_000_000).toISOString(),
      },
      {
        id: nanoid(),
        title: 'Schedule dental cleaning',
        notes: 'Prefer Tuesday mornings.',
        area: 'health',
        priority: 4,
        due: addDays(today, 4),
        done: false,
        doneAt: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: nanoid(),
        title: 'Oil the desk lamp hinge',
        notes: '',
        area: 'home',
        priority: 3,
        due: yesterday,
        done: true,
        doneAt: yesterday + 'T19:40:00.000Z',
        createdAt: yesterday + 'T08:00:00.000Z',
      },
    ],
    habits: [
      {
        id: nanoid(),
        title: 'Morning pages',
        freq: 'daily',
        color: '#3a9e94',
        createdAt: fourAgo + 'T08:00:00.000Z',
        completions: [fourAgo, threeAgo, twoAgo, yesterday],
      },
      {
        id: nanoid(),
        title: 'Walk 20 min',
        freq: 'weekdays',
        color: '#a8893e',
        createdAt: fourAgo + 'T08:00:00.000Z',
        completions: [threeAgo, yesterday],
      },
      {
        id: nanoid(),
        title: 'Stretch before bed',
        freq: 'daily',
        color: '#c45b4e',
        createdAt: fourAgo + 'T08:00:00.000Z',
        completions: [twoAgo, yesterday],
      },
      {
        id: nanoid(),
        title: 'Inbox zero pass',
        freq: 'weekly',
        color: '#5a8f86',
        createdAt: fourAgo + 'T08:00:00.000Z',
        completions: [],
      },
    ],
    journal: [
      {
        id: nanoid(),
        date: today,
        mood: 4,
        note: 'Clear head after coffee on the pier. Ready to clear the open slips.',
        createdAt: today + 'T07:35:00.000Z',
      },
      {
        id: nanoid(),
        date: yesterday,
        mood: 3,
        note: 'Steady tide. Short walk after lunch, then desk work until dusk.',
        createdAt: yesterday + 'T21:00:00.000Z',
      },
      {
        id: nanoid(),
        date: twoAgo,
        mood: 4,
        note: 'Bright morning — finished the lamp repair early.',
        createdAt: twoAgo + 'T20:10:00.000Z',
      },
    ],
  }
}
