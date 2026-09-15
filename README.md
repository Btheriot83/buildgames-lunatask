# Tideglass — Lunatask replacement (Build Games)

Local-first personal planner: **tasks**, **recurring habits with streaks**, **mood / light journal**, and a **calendar-ish day strip**. No accounts, billing, telemetry, or sync.

**Live demo:** https://buildgames-lunatask.vercel.app

**Aesthetic:** Tideglass (deep tidewater ink, seafoam progress, coral accents, brass streaks; Fraunces + IBM Plex).

## Stack

React 19 + TypeScript + Vite + IndexedDB (`idb`). Static deploy on Vercel — no native SQLite.

## Commands

```bash
npm install
npm run dev          # http://127.0.0.1:5173
npm run test:unit
npm run build
npm run preview      # production build locally
npm run test:e2e     # Playwright against preview
```

## Data & backup

- Browser **IndexedDB** database `tideglass-lunatask` (key `snapshot`).
- **Export** downloads a Tideglass v1 JSON backup.
- **Import** restores a backup file.
- **Sample** / **Clear** for demo resets.

## Limits vs Lunatask

Deliberately excluded (paid / platform advantages): end-to-end sync, encryption-at-rest cloud, calendar OAuth time-blocking, relationships CRM, notes notebooks, Zapier/API, mobile push.

## Architecture

- `src/store/plannerStore.ts` — Zustand + persist
- `src/lib/db.ts` — IndexedDB
- `src/components/*` — Today / Tasks / Habits / Mood
- `src/styles/transitions.css` — transitions.dev free recipes wired into real UX

## License

Personal Build Games candidate for Brandon Theriot.
