# Tideglass Phase B4 INTEGRITY workbench (20 counted rounds)

Identity locked: `docs/IDENTITY.md` (**Harbor Desk**). No reseed.

**Job (≤3s):** Today’s **tasks + habits + mood**.

**Bar:** https://lunatask.app/ · Demo: https://buildgames-lunatask.vercel.app

**B4 mandate (INTEGRITY_GATE):** fonts / contrast / buttons / bar gap — one primary focus per round; separate `rN:` commit; shot; honest verdict; bar A/B every 5th.

**Before:** `shots-r4/r4-before.png` · **Bar home:** `shots-r4/bar-lunatask-home.png`

## transitions.dev recipe → action
| Recipe | Fires on |
|--------|----------|
| success-check | mood save, export backup (`flashSuccess`) |
| toast | add/fail task, habit, mood, import/export, demo/clear |
| error-state-shake | empty task title submit |
| checkbox-check | task complete toggle (class `t-checkbox-check`) |
| success-check | **also** task done + habit tick (`flashSuccess`) |
| toast | **also** task done/reopen + habit tick |
| tabs-sliding | Today/Tasks/Habits/Mood tab change |
| number-pop-in | meter digit render (**remount on value**) |
| panel-reveal | panel mount (`data-state=in`) |
| skeleton-reveal | boot loading shell |
| texts-reveal | app frame enter |



## r1 — fonts
- files: src/index.css
- shot: gauntlet/shots-r4/r1-fonts-job.png
- verdict: Job H2 larger/tighter; still softer than Lunatask CircularStd marketing H1.
- commit: 3e2a5d2

## r2 — fonts
- files: src/index.css
- shot: gauntlet/shots-r4/r2-fonts-ui.png
- verdict: Tab/card tracking tighter; still not CircularStd geometric bite.
- commit: aab15da

## r3 — contrast
- files: src/index.css
- shot: gauntlet/shots-r4/r3-contrast.png
- verdict: Ink-on-paper deepened; triad text holds vs washed bone, still shy of Lunatask dark-app ink punch.
- commit: 84efd0b

## r4 — buttons
- files: src/index.css
- shot: gauntlet/shots-r4/r4-buttons-radius.png
- verdict: CTA 5px + taller pad closer to Lunatask coral rect; seafoam still quieter than coral #F04037.
- commit: c703d92

## r5 — buttons
- files: src/index.css
- shot: gauntlet/shots-r4/r5-buttons-secondary.png; gauntlet/shots-r4/r5-bar.png; gauntlet/shots-r4/r5-ab-candidate.png
- verdict: Secondary outlines clearer; bar still wins with coral solid CTA + CircularStd H1 on white.
- commit: c703d92

## r6 — bar gap
- files: src/store/plannerStore.ts, src/components/NumberPop.tsx, src/index.css
- shot: gauntlet/shots-r4/r6-bar-gap-transitions.png
- verdict: Denser rows + success/toast on complete; still behind Lunatask dark app chrome density.
- commit: c74c959
- transitions: success-check+toast on task/habit tick; number-pop remount; shake/toast empty add unchanged

## r7 — contrast
- files: src/index.css, src/store/plannerStore.ts
- shot: gauntlet/shots-r4/r7-contrast-muted.png
- verdict: Meta darker on bone; still softer than Lunatask dark-UI ink hierarchy / dream target punch.
- commit: TBD
- dream-loop: closing muted wash toward target denser desk type
- transitions: habit tick → toast + success-check
