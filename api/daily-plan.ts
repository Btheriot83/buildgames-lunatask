import type { VercelRequest, VercelResponse } from '@vercel/node'

type TaskIn = { title: string; priority?: number; due?: string | null; done?: boolean }
type HabitIn = { title: string; freq?: string; streak?: number; dueToday?: boolean }
type Body = {
  day?: string
  mood?: number | null
  moodNote?: string
  tasks?: TaskIn[]
  habits?: HabitIn[]
}

type PlanOut = {
  focus: string
  orderedTasks: string[]
  habitSuggestions: string[]
  note: string
  mode: 'llm'
  provider: string
  model: string
}

function pickProviders(): { name: string; url: string; key: string; model: string }[] {
  const shared = process.env.BUILD_GAMES_LLM_API_KEY?.trim()
  const out: { name: string; url: string; key: string; model: string }[] = []

  const xai = process.env.XAI_API_KEY?.trim() || process.env.GROK_API_KEY?.trim() || (shared?.startsWith('xai-') ? shared : undefined)
  if (xai) {
    out.push({
      name: 'xai',
      url: (process.env.XAI_BASE_URL || 'https://api.x.ai/v1').replace(/\/$/, '') + '/chat/completions',
      key: xai,
      model: process.env.XAI_MODEL || process.env.GROK_MODEL || 'grok-2-latest',
    })
  }

  const openai =
    process.env.OPENAI_API_KEY?.trim() || (shared && !shared.startsWith('xai-') ? shared : undefined)
  if (openai) {
    out.push({
      name: 'openai-compat',
      url: (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '') + '/chat/completions',
      key: openai,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    })
  }

  // Last resort: shared key against xAI even if prefix unknown
  if (shared && !out.some((p) => p.key === shared)) {
    out.push({
      name: 'shared-xai-fallback',
      url: 'https://api.x.ai/v1/chat/completions',
      key: shared,
      model: process.env.XAI_MODEL || 'grok-2-latest',
    })
  }

  return out
}

const SYSTEM = `You are Tideglass, a calm harbor-desk daily planner.
Return ONLY JSON with keys:
- focus (string, one sentence naming the day's spine)
- orderedTasks (string[], 3-7 concrete task titles in do-order; reuse/adapt open tasks when sensible)
- habitSuggestions (string[], 1-4 small habits to protect today)
- note (string, one short coaching line, no hype)
Rules: no emoji; no fake stats; no purple SaaS tone; no "supercharge"; concrete and local-first.`

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}) as Body
  const day = (body.day || new Date().toISOString().slice(0, 10)).slice(0, 10)
  const openTasks = (body.tasks || []).filter((t) => !t.done).slice(0, 24)
  const habits = (body.habits || []).slice(0, 16)

  const providers = pickProviders()
  if (!providers.length) {
    return res.status(503).json({
      error: 'AI not configured',
      hint: 'Set BUILD_GAMES_LLM_API_KEY (or XAI_API_KEY / OPENAI_API_KEY) on the server',
    })
  }

  const user = JSON.stringify({
    day,
    mood: body.mood ?? null,
    moodNote: (body.moodNote || '').slice(0, 280),
    openTasks,
    habits,
  }).slice(0, 8000)

  let lastErr = 'all providers failed'
  for (const p of providers) {
    try {
      const r = await fetch(p.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${p.key}`,
        },
        body: JSON.stringify({
          model: p.model,
          temperature: 0.4,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: SYSTEM },
            { role: 'user', content: user },
          ],
        }),
      })
      const data = (await r.json()) as {
        error?: { message?: string }
        model?: string
        choices?: { message?: { content?: string } }[]
      }
      if (!r.ok) {
        lastErr = data.error?.message || `upstream ${r.status}`
        continue
      }
      const raw = data.choices?.[0]?.message?.content?.trim() || ''
      const parsed = JSON.parse(raw) as Partial<PlanOut>
      if (!parsed.focus || !Array.isArray(parsed.orderedTasks)) {
        lastErr = 'bad JSON shape'
        continue
      }
      const plan: PlanOut = {
        focus: String(parsed.focus).slice(0, 240),
        orderedTasks: parsed.orderedTasks.map(String).slice(0, 8),
        habitSuggestions: (parsed.habitSuggestions || []).map(String).slice(0, 4),
        note: String(parsed.note || '').slice(0, 240),
        mode: 'llm',
        provider: p.name,
        model: data.model || p.model,
      }
      return res.status(200).json(plan)
    } catch (e) {
      lastErr = e instanceof Error ? e.message : 'provider error'
    }
  }

  return res.status(502).json({ error: lastErr })
}
