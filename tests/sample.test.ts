import { describe, expect, it } from 'vitest'
import { makeSample } from '../src/lib/sample'
import { parseImport } from '../src/lib/export'

describe('sample + import', () => {
  it('seeds tasks habits journal', () => {
    const s = makeSample(new Date('2026-09-14T12:00:00'))
    expect(s.version).toBe(1)
    expect(s.tasks.length).toBeGreaterThan(0)
    expect(s.habits.length).toBeGreaterThan(0)
    expect(s.journal.length).toBeGreaterThan(0)
  })

  it('roundtrips JSON snapshot', () => {
    const s = makeSample()
    const again = parseImport(JSON.stringify(s))
    expect(again.tasks.length).toBe(s.tasks.length)
    expect(again.habits[0].title).toBe(s.habits[0].title)
  })
})
