# Tideglass Phase B3 workbench (20 rounds)

Identity locked: `docs/IDENTITY.md` (**Harbor Desk**). No reseed.

**Job (≤3s):** Today’s **tasks + habits + mood**.

**Bar:** https://lunatask.app/ · Demo: https://buildgames-lunatask.vercel.app

**B3 mandate:** fonts, contrast, buttons, close A/B vs live Lunatask, flat no-gradient.

## Bar notes (live lunatask.app)
- Type: **CircularStd** bold geometric sans; huge high-contrast H1 on white
- Primary CTA: solid coral `#F04037`, white text, **~5px radius** (not pills), generous pad
- Flat marketing chrome; app mock dark sidebar + crisp task rows
- Screens: `r3-bar-lunatask-home.png`, `r3-bar-midwave.png`

## Before (B2 live)
`r3-before-demo.png` — pill CTAs (999px), primary bone-on-seafoam **~2.8:1** fail, Fraunces on mood/day digits, washed muted `#6e675b` / `#7a7264`.

## Rounds

| # | Focus | Screenshot | Verdict |
|---|-------|------------|---------|
| R1 | Type ladder: brand Fraunces only; job/cards Plex 700 | `r3-r01-type-hierarchy.png` | Hierarchy reads like CircularStd clarity without reseeding |
| R2 | Kill Fraunces on day DOM / mood lead / mood-num | `r3-r02-no-fraunces-ui.png` | Fraunces offenders = 0 in DOM audit |
| R3 | Load IBM Plex Sans **700**; job title weight | `r3-r03-plex-700-job.png` | Job verb bold at 31px / 700 |
| R4 | Buttons: 999px pills → **6px** radius (bar ~5px) | `r3-r04-btn-radius-6.png` | CTAs match Lunatask rect craft |
| R5 | Primary contrast: white on `--seafoam-cta` `#2f7f78` | `r3-r05-primary-contrast.png` | Contrast **4.74:1** (was 2.82) |
| R6 | Secondary outline for Export/Import | `r3-r06-secondary-outline.png` | Primary earns weight vs chrome |
| R7 | Ghost tertiary (Demo day) quiet | `r3-r07-ghost-quiet.png` | Tertiary no longer competes |
| R8 | Muted paper text → `#4a453c` (was washed `#6e675b`) | `r3-r08-muted-paper.png` | Meta holds on bone paper |
| R9 | Meter / brass label contrast on ink-2 | `r3-r09-meter-labels.png` | Stat labels readable |
| R10 | Tasks panel add/remove button hierarchy | `r3-r10-tasks-buttons.png` | Add primary; remove quiet |
| R11 | Habits panel contrast + streak mono | `r3-r11-habits-contrast.png` | Habit rows ink-on-paper |
| R12 | Mood type: sans lead + mono digits | `r3-r12-mood-type.png` | No display-serif mood chrome |
| R13 | Flat checkbox (no glow) | `r3-r13-check-flat.png` | Solid seafoam check |
| R14 | Habit tick coral fill when checked | `r3-r14-habit-tick.png` | Tick affordance clear |
| R15 | Mood chips flat 8px, selected seafoam border | `r3-r15-mood-chips.png` | Chip selection readable |
| R16 | Tabs: flat track, solid glider (no rgba wash) | `r3-r16-tabs-flat.png` | Active tab clear |
| R17 | A/B bar screenshot mid-wave | `r3-r17-ab-bar.png` | Bar: coral rect CTA, CircularStd |
| R18 | A/B candidate after craft | `r3-r18-ab-candidate.png` | Candidate: seafoam rect CTA, Plex |
| R19 | Flat audit — 0 CSS gradients | `r3-r19-flat-audit.png` | `gradients: 0` computed |
| R20 | Coherence / above-fold final | `r3-r20-final.png`, `r3-flat-no-gradient.png` | Triad + craft buttons hold |

## Blind stance vs original
Original still wins marketing polish + product depth. Candidate closes craft gap on **type discipline**, **CTA contrast/shape**, and **button hierarchy** under Harbor Desk. Flat materials preserved.

## Visible deltas (B3 vs B2 before)
1. Pill CTAs → 6px rectangular buttons (Lunatask-like).
2. Primary bone-on-seafoam fail → white on `#2f7f78` (~4.7:1).
3. Fraunces removed from day/mood UI (mark-only).
4. Export/Import secondary outline; Demo day tertiary ghost.
5. Paper muted text darkened so meta does not wash out.
