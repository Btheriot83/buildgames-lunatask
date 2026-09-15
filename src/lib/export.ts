import { saveAs } from 'file-saver'
import type { Snapshot } from './types'

export function exportJson(snap: Snapshot) {
  const blob = new Blob([JSON.stringify(snap, null, 2)], {
    type: 'application/json;charset=utf-8',
  })
  const stamp = new Date().toISOString().slice(0, 10)
  saveAs(blob, `tideglass-backup-${stamp}.json`)
}

export function parseImport(text: string): Snapshot {
  const data = JSON.parse(text) as Snapshot
  if (!data || data.version !== 1 || !Array.isArray(data.tasks)) {
    throw new Error('Not a Tideglass v1 backup')
  }
  return {
    version: 1,
    seeded: Boolean(data.seeded),
    tasks: data.tasks ?? [],
    habits: data.habits ?? [],
    journal: data.journal ?? [],
  }
}
