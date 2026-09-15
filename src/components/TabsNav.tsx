import type { TabId } from '../lib/types'
import { usePlanner } from '../store/plannerStore'

const TABS: { id: TabId; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'habits', label: 'Habits' },
  { id: 'mood', label: 'Mood' },
]

export function TabsNav() {
  const tab = usePlanner((s) => s.tab)
  const setTab = usePlanner((s) => s.setTab)
  const idx = TABS.findIndex((t) => t.id === tab)

  return (
    <nav className="tabs-nav t-tabs-sliding" aria-label="Views">
      <div className="tabs-track">
        <span className="tabs-glider" style={{ ['--tab-i' as string]: idx, ['--tab-n' as string]: TABS.length }} />
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`tab-btn ${tab === t.id ? 'is-active' : ''}`}
            aria-current={tab === t.id ? 'page' : undefined}
            onClick={() => setTab(t.id)}
            data-testid={`tab-${t.id}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
