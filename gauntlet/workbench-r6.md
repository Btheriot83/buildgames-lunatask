# Tideglass Phase B6 INTEGRITY workbench (10 counted rounds)

Identity locked: `docs/IDENTITY.md` (**Harbor Desk**). No Anshu reseed. Brandon: Tideglass OK / KEEP.

**Job (≤3s):** Today’s **tasks + habits + mood**.

**Bar:** https://lunatask.app/ · Demo: https://buildgames-lunatask.vercel.app

**B6 mandate:** fonts / contrast / buttons / bar gap — one primary focus per round; separate `rN:` commit; shot; honest verdict; bar A/B every 5th; flat no-gradient; transitions.dev on real actions.

**Before:** `shots-r6/r6-before.png` · **Bar home:** `shots-r6/bar-lunatask-home.png` · **Dream:** `shots-r6/dream-target.png`

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
| notification-badge | tasks-due meter when `dueToday > 0` (r6 badge punch retained) |

## r1 — fonts
- files: src/index.css
- shot: gauntlet/shots-r6/r1-fonts-meters.png
- verdict: Meter digits mono/tabular punch clearer; Lunatask CircularStd marketing H1 still wins type polish.
- commit: a8b8a00

## r2 — contrast
- files: src/index.css
- shot: gauntlet/shots-r6/r2-contrast-chips.png
- verdict: Selected day chip + job meters punchier; bar dark-app ink still deeper.
- commit: 5effcc2

## r3 — buttons
- files: src/index.css
- shot: gauntlet/shots-r6/r3-buttons-mood.png
- verdict: Mood chips / tiny primary nearer Lunatask rect control language; coral CTA heat still wins marketing.
- commit: 7f019cd

## r4 — bar gap
- files: src/index.css
- shot: gauntlet/shots-r6/r4-bar-gap-chrome.png
- verdict: Denser chrome meters/actions; Lunatask product mock chrome still richer.
- commit: 87621c9

## r5 — fonts
- files: src/index.css
- shot: gauntlet/shots-r6/r5-fonts-meta.png; gauntlet/shots-r6/r5-bar.png; gauntlet/shots-r6/r5-ab-candidate.png
- verdict: Card heads + mono meta ladder tighter; bar CircularStd + coral CTA still dominate.
- commit: a1d861b

## r6 — bar gap
- files: src/index.css, src/styles/transitions.css
- shot: gauntlet/shots-r6/r6-bar-gap-badge.png
- verdict: Due badge larger + triad denser toward dream; still behind Lunatask product-depth chrome.
- commit: 5bd1dd0
- transitions: notification-badge size punch; prior recipes unchanged

## r7 — contrast
- files: src/index.css
- shot: gauntlet/shots-r6/r7-contrast-brass.png
- verdict: Brass streak + darker paper ink; bar journal charts still deeper.
- commit: c636bd4
- dream-loop: streak/paper contrast toward target.png

## r8 — buttons
- files: src/index.css
- shot: gauntlet/shots-r6/r8-buttons-tabs.png
- verdict: Active tab pill + coral tick rings punchier; Lunatask app rows still denser.
- commit: 9c7f675
- dream-loop: control affordances vs target

## r9 — bar gap
- files: src/index.css
- shot: gauntlet/shots-r6/r9-bar-gap-dream.png
- verdict: Quieter hero + equal triad toward dream; bar mock still richer product chrome.
- commit: b612ab8
- dream-loop: composition density vs target.png

## r10 — bar gap
- files: src/index.css
- shot: gauntlet/shots-r6/r10-final.png; gauntlet/shots-r6/r10-bar.png; gauntlet/shots-r6/r10-ab-candidate.png; gauntlet/shots-r6/r10-vs-dream.png
- verdict: Job triad reads ≤3s under Harbor Desk flat materials; Lunatask still wins marketing CircularStd/coral + product depth. Dream closer on badge/tabs/meters; Fraunces kept mark-only.
- commit: 3d510cc
- dream-loop: final live vs .dream-loop/target.png + bar
- flat: decorative gradients/glow killed; coral reserved for habit tick + due badge
