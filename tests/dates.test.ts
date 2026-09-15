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
