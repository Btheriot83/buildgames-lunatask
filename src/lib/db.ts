import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { Snapshot } from './types'

interface TideglassDB extends DBSchema {
  meta: {
    key: string
    value: Snapshot
  }
}

const DB_NAME = 'tideglass-lunatask'
const STORE = 'meta'
const KEY = 'snapshot'

let dbp: Promise<IDBPDatabase<TideglassDB>> | null = null

function getDb() {
  if (!dbp) {
    dbp = openDB<TideglassDB>(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE)
      },
    })
  }
  return dbp
}

export async function loadSnapshot(): Promise<Snapshot | null> {
  const db = await getDb()
  return (await db.get(STORE, KEY)) ?? null
}

export async function saveSnapshot(snap: Snapshot): Promise<void> {
  const db = await getDb()
  await db.put(STORE, snap, KEY)
}

export async function clearSnapshot(): Promise<void> {
  const db = await getDb()
  await db.delete(STORE, KEY)
}
