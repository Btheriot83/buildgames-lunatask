import { describe, expect, it } from 'vitest'
import { addDays, habitStreak, isHabitDue, todayISO } from '../src/lib/dates'

describe('dates', () => {
  it('formats todayISO', () => {
    expect(todayISO(new Date(2026, 8, 14))).toBe('2026-09-14')
  })

  it('addDays rolls months', () => {
    expect(addDays('2026-09-30', 1)).toBe('2026-10-01')
  })

  it('habitStreak counts consecutive days', () => {
    const completions = ['2026-09-12', '2026-09-13', '2026-09-14']
    expect(habitStreak(completions, '2026-09-14')).toBe(3)
    expect(habitStreak(['2026-09-12'], '2026-09-14')).toBe(0)
  })

  it('isHabitDue respects weekdays', () => {
    // 2026-09-13 is Sunday
    expect(isHabitDue('weekdays', '2026-09-13', [])).toBe(false)
    // 2026-09-14 is Monday
    expect(isHabitDue('weekdays', '2026-09-14', [])).toBe(true)
  })
})

import { bucketForHabit, bucketForTask, groupToday } from '../src/lib/todayGroups'
import { makeSample } from '../src/lib/sample'

describe('today grouping', () => {
  it('puts P1 and overdue in This tide', () => {
    expect(bucketForTask({ priority: 1, due: '2026-09-15' } as never, '2026-09-15')).toBe('tide')
    expect(bucketForTask({ priority: 3, due: '2026-09-14' } as never, '2026-09-15')).toBe('tide')
    expect(bucketForTask({ priority: 2, due: '2026-09-15' } as never, '2026-09-15')).toBe('later')
    expect(bucketForTask({ priority: 3, due: '2026-09-15' } as never, '2026-09-15')).toBe('evening')
  })

  it('slots habits by title rhythm', () => {
    expect(bucketForHabit({ title: 'Morning pages' } as never)).toBe('tide')
    expect(bucketForHabit({ title: 'Stretch before bed' } as never)).toBe('evening')
    expect(bucketForHabit({ title: 'Inbox zero pass' } as never)).toBe('later')
  })

  it('groups a sample day into three editorial buckets', () => {
    const s = makeSample(new Date('2026-09-15T12:00:00'))
    const g = groupToday(s.tasks, s.habits, '2026-09-15')
    expect(g.map((x) => x.id)).toEqual(['tide', 'later', 'evening'])
    expect(g.every((x) => x.tasks.length + x.habits.length > 0)).toBe(true)
  })
})
