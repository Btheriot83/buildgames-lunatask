export type DailyPlan = {
  focus: string
  orderedTasks: string[]
  habitSuggestions: string[]
  note: string
  mode: 'llm'
  provider: string
  model: string
}

export type PlanContext = {
  day: string
  mood?: number | null
  moodNote?: string
  tasks: { title: string; priority?: number; due?: string | null; done?: boolean }[]
  habits: { title: string; freq?: string; streak?: number; dueToday?: boolean }[]
}

export async function fetchDailyPlan(ctx: PlanContext): Promise<DailyPlan> {
  const r = await fetch('/api/daily-plan', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(ctx),
  })
  const data = await r.json()
  if (!r.ok) throw new Error(data.error || `Plan failed (${r.status})`)
  return data as DailyPlan
}
