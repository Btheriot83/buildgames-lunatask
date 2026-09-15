import { useEffect } from 'react'
import { DayStrip } from './components/DayStrip'
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
  const tab = usePlanner((s) => s.tab)

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
            <div className="desk-hero desk-hero-band" aria-hidden="true">
              <video
                className="desk-hero-video"
                autoPlay
                muted
                loop
                playsInline
                poster="/imagine/empty-tide-desk.jpg"
              >
                <source src="/motion/tide-desk-drift.mp4" type="video/mp4" />
              </video>
              <div className="desk-hero-veil" />
              <p className="desk-hero-caption">Bone paper desk · local ledger</p>
            </div>
            <DayStrip />
            <TabsNav />
            <main className="panel-stage" aria-live="polite">
              {tab === 'today' && <TodayPanel />}
              {tab === 'tasks' && <TasksPanel />}
              {tab === 'habits' && <HabitsPanel />}
              {tab === 'mood' && <MoodPanel />}
            </main>
          </div>
        </div>
      )}
      <Toast />
      <SuccessOverlay />
    </div>
  )
}
