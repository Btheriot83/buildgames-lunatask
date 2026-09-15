# Tideglass Phase B5 INTEGRITY workbench (10 counted rounds)

Identity locked: `docs/IDENTITY.md` (**Harbor Desk**). No Anshu reseed. Brandon: Tideglass OK / KEEP.

**Job (≤3s):** Today’s **tasks + habits + mood**.

**Bar:** https://lunatask.app/ · Demo: https://buildgames-lunatask.vercel.app

**B5 mandate:** fonts / contrast / buttons / bar gap — one primary focus per round; separate `rN:` commit; shot; honest verdict; bar A/B every 5th; flat no-gradient; transitions.dev on real actions.

**Before:** `shots-r5/r5-before.png` · **Bar home:** `shots-r5/bar-lunatask-home.png` · **Dream:** `shots-r5/dream-target.png`

## transitions.dev recipe → action
| Recipe | Fires on |
|--------|----------|
| success-check | mood save, export backup, task done, habit tick (`flashSuccess`) |
| toast | add/fail task, habit, mood, import/export, demo/clear, task done/reopen, habit tick |
| error-state-shake | empty task title submit |
| checkbox-check | task complete toggle (`t-checkbox-check`) |
| tabs-sliding | Today/Tasks/Habits/Mood tab change |
| number-pop-in | meter digit remount on value |
| panel-reveal | panel mount (`data-state=in`) |
| skeleton-reveal | boot loading shell |
| texts-reveal | app frame enter |
| notification-badge | **new r6** — tasks-due meter when `dueToday > 0` |

## r1 — fonts
- files: src/index.css
- shot: gauntlet/shots-r5/r1-fonts-brand.png
- verdict: Brand mark larger/tighter; still softer than Lunatask CircularStd marketing H1.
- commit: 21dc03b

## r2 — contrast
- files: src/index.css
- shot: gauntlet/shots-r5/r2-contrast-chrome.png
- verdict: Chrome bone/meter brass clearer; still shy of Lunatask dark-app ink punch.
- commit: 6cf534d

## r3 — buttons
- files: src/index.css
- shot: gauntlet/shots-r5/r3-buttons-cta.png
- verdict: 44px solid seafoam CTA nearer Lunatask coral rect height; coral heat still wins.
- commit: 0a7c700

## r4 — bar gap
- files: src/index.css
- shot: gauntlet/shots-r5/r4-bar-gap-chrome.png
- verdict: Denser meters/actions; Lunatask product mock still richer chrome.
- commit: 31e20aa

## r5 — fonts
- files: src/index.css
- shot: gauntlet/shots-r5/r5-fonts-rows.png; gauntlet/shots-r5/r5-bar.png; gauntlet/shots-r5/r5-ab-candidate.png
- verdict: Row titles tighter; bar CircularStd H1 + coral CTA still dominate marketing polish.
- commit: 0a75ffe

## r6 — bar gap
- files: src/index.css, src/styles/transitions.css, src/components/ShellChrome.tsx, src/transitions/notification-badge.md
- shot: gauntlet/shots-r5/r6-bar-gap-badge.png
- verdict: Triad denser + badge on due meter; still behind Lunatask product-depth chrome.
- commit: 33b0763
- transitions: notification-badge on tasks-due; prior recipes unchanged

## r7 — contrast
- files: src/index.css
- shot: gauntlet/shots-r5/r7-contrast-streak.png
- verdict: Coral streak signal + darker muted meta; bar journal charts still deeper.
- commit: 3fcc4a7
- dream-loop: streak heat toward target coral ticks

## r8 — buttons
- files: src/index.css
- shot: gauntlet/shots-r5/r8-buttons-controls.png
- verdict: Check/tick punchier, Remove quieter; Lunatask app rows still denser.
- commit: a86ba3a
- dream-loop: control affordances vs target

## r9 — bar gap
- files: src/index.css
- shot: gauntlet/shots-r5/r9-bar-gap-triad.png
- verdict: Equal triad + card-head hairline toward dream; bar mock still richer.
- commit: a8ef5e2
- dream-loop: composition density vs target.png

## r10 — bar gap
- files: src/index.css
- shot: gauntlet/shots-r5/r10-final.png; gauntlet/shots-r5/r10-bar.png; gauntlet/shots-r5/r10-ab-candidate.png; gauntlet/shots-r5/r10-vs-dream.png
- verdict: Job triad reads ≤3s under Harbor Desk flat materials; Lunatask still wins marketing CircularStd/coral + product depth. Dream closer on density/ticks/badge; Fraunces kept mark-only.
- commit: ebfc6ee
- dream-loop: final live vs .dream-loop/target.png + bar
- flat: decorative gradients killed (background-image:none on chrome); coral reserved for habit/badge only
