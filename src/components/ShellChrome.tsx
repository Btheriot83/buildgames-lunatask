import { useRef } from 'react'
import { COPY } from '../lib/copy'
import { usePlanner } from '../store/plannerStore'
import { scrollToSection } from './TabsNav'

export function ShellChrome() {
  const exportBackup = usePlanner((s) => s.exportBackup)
  const importBackup = usePlanner((s) => s.importBackup)
  const loadSample = usePlanner((s) => s.loadSample)
  const resetAll = usePlanner((s) => s.resetAll)
  const tab = usePlanner((s) => s.tab)
  const setTab = usePlanner((s) => s.setTab)
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <header className="shell-chrome shell-chrome-lean">
      <div className="brand-block">
        <div className="brand-mark-row">
          <img
            className="brand-bottle"
            src="/imagine/tideglass-mark.jpg"
            alt=""
            width={72}
            height={72}
          />
          <div>
            <p className="eyebrow">{COPY.desk}</p>
            <h1 className="brand-title">{COPY.name}</h1>
          </div>
        </div>
        <p className="brand-sub">{COPY.sub}</p>
      </div>
      <div className="chrome-actions">
        {tab !== 'today' && (
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              setTab('today')
              scrollToSection('today')
            }}
            data-testid="go-today"
          >
            {COPY.openToday}
          </button>
        )}
        <button type="button" className="btn secondary" onClick={exportBackup} data-testid="export-btn">
          {COPY.export}
        </button>
        <details className="ledger-menu">
          <summary className="btn tiny ghost">{COPY.ledger}</summary>
          <div className="ledger-menu-panel">
            <button type="button" className="btn tiny ghost" onClick={() => fileRef.current?.click()}>
              Import backup
            </button>
            <button type="button" className="btn tiny ghost" onClick={() => void loadSample()} title="Load a believable demo day">
              Demo day
            </button>
            <button
              type="button"
              className="btn tiny danger-ghost"
              onClick={() => {
                if (confirm('Clear all Tideglass data on this device?')) void resetAll()
              }}
            >
              Clear device
            </button>
          </div>
        </details>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (!f) return
            const reader = new FileReader()
            reader.onload = () => {
              void importBackup(String(reader.result ?? ''))
            }
            reader.readAsText(f)
            e.target.value = ''
          }}
        />
      </div>
    </header>
  )
}
