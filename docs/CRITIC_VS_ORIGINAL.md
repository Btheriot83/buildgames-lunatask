# Independent critic — vs live original Lunatask

**Bar product reviewed:** https://lunatask.app/ (screenshot: `original-lunatask-home.png`)  
**Candidate reviewed:** https://buildgames-lunatask.vercel.app (`live-smoke.png`, `live-mood.png`)  
**Date:** 2026-09-14 PT  
**Judge:** separate from implementer; opened live original marketing/product site before scoring.

## Aesthetic name (candidate)
**Tideglass** — deep tidewater ink desk, seafoam progress rings, coral habit ticks, brass streak counters. Fraunces + IBM Plex Sans/Mono. Animated tide-line canvas (not purple SaaS).

## What the original does as the bar
- Encrypted all-in-one: guided task workflows, habit tracker with visuals, mood/life tracking, journaling, notes, relationships, calendar time-blocking, sync, integrations (Zapier/API/email).
- Soft moonlit marketing, polished product chrome, ADHD-oriented prioritization, WIP limits, status tracking.
- Cross-device sync + E2EE as core trust claim; free + premium tiers.

## Candidate vs that bar (core loop only)
| Criterion | Score /10 | Notes |
|-----------|-----------|-------|
| Task capture + complete | 9.0 | Live: add task, checkbox-check, areas/priority; lighter than Lunatask guiding workflows |
| Habits + streaks | 9.0 | Daily/weekdays/weekly + streak NumberPop; less visual heat-map than original habit tracker |
| Mood / light journal | 8.5 | 1–5 check-in + note + recent list; no multi-year charts |
| Day / calendar-ish view | 8.0 | Week strip + Today focus board; no OAuth calendar time-blocking |
| Clarity on first visit | 9.0 | Sample data, stats, tabs readable immediately on live URL |
| Distinctive craft (anti-slop) | 9.0 | Tideglass language; zero vibe-purple / Inter / 3-card hero |
| Motion / feedback | 8.5 | transitions.dev success-check, toast, tabs glider, skeleton, number-pop, checkbox; tide canvas |
| Export / backup honesty | 9.5 | JSON export/import; IndexedDB labelled; no fake sync |
| Parity with paid extras | N/A | Correctly **excluded** E2EE cloud sync, relationships CRM, notes notebooks, Zapier/API, calendar OAuth |
| **Overall as personal Lunatask replacement** | **8.8** | Wins as honest local-first core loop with craft; loses on workflow depth, encryption/sync, and calendar richness |

## Biggest gaps vs original (accepted for contest scope)
1. No end-to-end encryption or multi-device sync.
2. No calendar OAuth / drag time-blocking.
3. No relationships module or secure notebooks.
4. Habit visualization is streak counters, not a full heat-map grid.

## Instant-fail check
Cleared: no purple gradients, no Inter, no centered SaaS hero CTA pair, no fake “10K users” banner, no emoji nav, no glassmorphism neon glow stack.

## Verdict
Ship for Brandon review: live URL HTTP 200, App Desk smoked habit→task→mood→export on production, critic judged against live original — not self-only.
