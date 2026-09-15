import { useEffect } from 'react'
import { DayStrip } from './components/DayStrip'
import { FriendWalkthrough } from './components/FriendWalkthrough'
import { HabitsPanel } from './components/HabitsPanel'
import { LoadingShell } from './components/LoadingShell'
import { MoodPanel } from './components/MoodPanel'
import { ShellChrome } from './components/ShellChrome'
import { SuccessOverlay } from './components/SuccessOverlay'
import { TabsNav } from './components/TabsNav'
import { TasksPanel } from './components/TasksPanel'
import { TodayPanel } from './components/TodayPanel'
import { Toast } from './components/Toast'
import { TideBg } from './components/TideBg'
import { usePlanner } from './store/plannerStore'

export default function App() {
  const boot = usePlanner((s) => s.boot)
  const loadStatus = usePlanner((s) => s.loadStatus)

  useEffect(() => {
    void boot()
  }, [boot])

  const booting = loadStatus === 'boot' || loadStatus === 'loading'
  const ready = loadStatus === 'ready' || loadStatus === 'error'

  return (
    <div className="app-shell">
      <TideBg />
      <LoadingShell revealed={!booting} />
      {ready && (
        <div className="app-frame t-texts-reveal" data-state="in">
          <ShellChrome />
          <div className="desk-paper">
            <DayStrip />
            <TabsNav />
            <main className="panel-stage scroll-desk" aria-live="polite">
              <div
                id="section-today"
                className="desk-section desk-section-stagger"
                data-section="today"
                style={{ ['--stagger' as string]: 0 }}
              >
                <TodayPanel />
              </div>
              <div
                id="section-tasks"
                className="desk-section desk-section-stagger"
                data-section="tasks"
                style={{ ['--stagger' as string]: 1 }}
              >
                <header className="desk-section-head">
                  <h2 className="desk-section-title">Tasks</h2>
                  <p className="desk-section-sub">Everything on the blotter.</p>
                </header>
                <TasksPanel />
              </div>
              <div
                id="section-habits"
                className="desk-section desk-section-stagger"
                data-section="habits"
                style={{ ['--stagger' as string]: 2 }}
              >
                <header className="desk-section-head">
                  <h2 className="desk-section-title">Habits</h2>
                  <p className="desk-section-sub">Keep the tide.</p>
                </header>
                <HabitsPanel />
              </div>
              <div
                id="section-mood"
                className="desk-section desk-section-stagger"
                data-section="mood"
                style={{ ['--stagger' as string]: 3 }}
              >
                <header className="desk-section-head">
                  <h2 className="desk-section-title">Mood</h2>
                  <p className="desk-section-sub">Weather for the day.</p>
                </header>
                <MoodPanel />
              </div>
            </main>
          </div>
          <FriendWalkthrough />
        </div>
      )}
      <Toast />
      <SuccessOverlay />
    </div>
  )
}
