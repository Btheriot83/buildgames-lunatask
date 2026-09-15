# Lenny / Anshu — Tideglass (Lunatask)

## 1. Discover
- Seed (never shown in UI): `56615cb519d3d552cc81e05bd513380f571f5e5d7b2caaf7` via `openssl rand -hex 24`
- Hex-derived palette cues: `#56615c` moss slate, `#5bd5`/`#19d3` seafoam/aqua, `#e05b`/`#d513` coral-ember, `#0f571f` forest depth → reinterpreted as tidewater ink desk (avoided purple `#b519d3` / `#7b2caa` chunks per anti-slop).
- Direction briefs:
  1. **Tideglass** — deep tidewater ink, seafoam rings, coral habit ticks, brass streak counters, Fraunces display (picked)
  2. **Moss Ledger** — parchment + iron type (too quiet; weak motion canvas)
  3. **Signal Ember** — cyan HUD + crimson (too close to game-HUD / SaaS neon)
- Ambition: animated tide canvas + transitions.dev microinteractions + honest streak gamification — not “clean modern SaaS”.

## 2. Define
- Implementer built React+Vite+IndexedDB planner (Today / Tasks / Habits / Mood).
- Independent critic reviewed **live original** https://lunatask.app/ (screenshots in `docs/original-*.png`) **and** live demo screenshots (`docs/live-*.png`).
- Critic scores: `docs/CRITIC_VS_ORIGINAL.md`.

## 3. Deliver
- Core loop: sample day → complete habit (streak) → add/complete task → mood check-in → JSON export.
- Cut: sync, E2EE cloud, calendar OAuth, relationships, notes notebooks, Zapier (paid advantages).
- transitions.dev free recipes in real UX: success-check, toast, skeleton-reveal, texts-reveal, tabs-sliding, number-pop-in, checkbox-check, error-state-shake, panel-reveal.
- Anti-slop: no vibe-purple, no Inter, no 3-card marketing hero, no fake stats banner, no emoji nav.
