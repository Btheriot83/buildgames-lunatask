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

type Provider =
  | { kind: 'openai-compat'; name: string; url: string; key: string; model: string }
  | { kind: 'anthropic'; name: string; url: string; key: string; model: string }

function cleanModel(m: string | undefined, fallback: string): string {
  const raw = (m || fallback).trim()
  // Strip accidental ANSI crumbs like "glm-5.3[1m]"
  return raw.replace(/\[[0-9;]*m/g, '').trim() || fallback
}

function providers(): Provider[] {
  const shared = process.env.BUILD_GAMES_LLM_API_KEY?.trim()
  const xai =
    process.env.XAI_API_KEY?.trim() ||
    process.env.GROK_API_KEY?.trim() ||
    (shared?.startsWith('xai-') ? shared : undefined)
  const openai =
    process.env.OPENAI_API_KEY?.trim() ||
    (shared && !shared.startsWith('xai-') ? shared : undefined)
  const out: Provider[] = []
  const seen = new Set<string>()
  const push = (p: Provider) => {
    const id = `${p.kind}:${p.url}:${p.model}`
    if (seen.has(id)) return
    seen.add(id)
    out.push(p)
  }

  const anth =
    process.env.ANTHROPIC_API_KEY?.trim() || process.env.ANTHROPIC_AUTH_TOKEN?.trim()
  if (anth) {
    const base = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/$/, '')
    push({
      kind: 'anthropic',
      name: 'anthropic',
      url: base + '/v1/messages',
      key: anth,
      model: cleanModel(process.env.ANTHROPIC_MODEL, 'glm-5.3'),
    })
  }

  if (xai) {
    push({
      kind: 'openai-compat',
      name: 'xai',
      url: (process.env.XAI_BASE_URL || 'https://api.x.ai/v1').replace(/\/$/, '') + '/chat/completions',
      key: xai,
      model: cleanModel(process.env.XAI_MODEL || process.env.GROK_MODEL, 'grok-2-latest'),
    })
  }

  if (openai) {
    push({
      kind: 'openai-compat',
      name: 'openai-compat',
      url:
        (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '') +
        '/chat/completions',
      key: openai,
      model: cleanModel(process.env.OPENAI_MODEL, 'gpt-4o-mini'),
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

function extractAnthropicText(data: {
  content?: { type: string; text?: string }[]
}): string {
  return (data.content || [])
    .filter((c) => c.type === 'text')
    .map((c) => c.text || '')
    .join('')
    .trim()
}

function parsePlan(raw: string, provider: string, model: string): PlanOut | null {
  let text = raw.trim()
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }
  try {
    const parsed = JSON.parse(text) as Partial<PlanOut>
    if (!parsed.focus || !Array.isArray(parsed.orderedTasks)) return null
    return {
      focus: String(parsed.focus).slice(0, 240),
      orderedTasks: parsed.orderedTasks.map(String).slice(0, 8),
      habitSuggestions: (parsed.habitSuggestions || []).map(String).slice(0, 4),
      note: String(parsed.note || '').slice(0, 240),
      mode: 'llm',
      provider,
      model,
    }
  } catch {
    return null
  }
}

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

  const list = providers()
  if (!list.length) {
    return res.status(503).json({
      error: 'AI not configured',
      hint: 'Set ANTHROPIC_AUTH_TOKEN / BUILD_GAMES_LLM_API_KEY / XAI_API_KEY / OPENAI_API_KEY',
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
  for (const p of list) {
    try {
      if (p.kind === 'anthropic') {
        const r = await fetch(p.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': p.key,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: p.model,
            max_tokens: 900,
            system: SYSTEM,
            messages: [{ role: 'user', content: user }],
          }),
        })
        const data = (await r.json()) as {
          error?: { message?: string }
          model?: string
          content?: { type: string; text?: string }[]
        }
        if (!r.ok) {
          lastErr = data.error?.message || `upstream ${r.status}`
          continue
        }
        const plan = parsePlan(extractAnthropicText(data), p.name, data.model || p.model)
        if (!plan) {
          lastErr = 'bad JSON shape'
          continue
        }
        return res.status(200).json(plan)
      }

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
      const plan = parsePlan(data.choices?.[0]?.message?.content || '', p.name, data.model || p.model)
      if (!plan) {
        lastErr = 'bad JSON shape'
        continue
      }
      return res.status(200).json(plan)
    } catch (e) {
      lastErr = e instanceof Error ? e.message : 'provider error'
    }
  }

  return res.status(502).json({ error: lastErr })
}
