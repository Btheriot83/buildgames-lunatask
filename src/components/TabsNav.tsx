import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import type { TabId } from '../lib/types'
import { usePlanner } from '../store/plannerStore'

export const SECTIONS: { id: TabId; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'habits', label: 'Habits' },
  { id: 'mood', label: 'Mood' },
]

export function scrollToSection(id: TabId) {
  const el = document.getElementById(`section-${id}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function TabsNav() {
  const tab = usePlanner((s) => s.tab)
  const setTab = usePlanner((s) => s.setTab)
  const trackRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const scrollingRef = useRef(false)

  const movePill = useCallback((animate: boolean) => {
    const pill = pillRef.current
    const btn = btnRefs.current[tab]
    if (!pill || !btn) return
    if (!animate) pill.style.transition = 'none'
    pill.style.transform = `translateX(${btn.offsetLeft}px)`
    pill.style.width = `${btn.offsetWidth}px`
    if (!animate) {
      // force reflow then restore transition
      void pill.offsetWidth
      pill.style.transition = ''
    }
  }, [tab])

  useLayoutEffect(() => {
    movePill(false)
  }, [movePill])

  useEffect(() => {
    movePill(true)
  }, [tab, movePill])

  useEffect(() => {
    const onResize = () => movePill(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [movePill])

  // Scroll spy — sticky section nav tracks which desk block is in view
  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(`section-${s.id}`)).filter(
      Boolean,
    ) as HTMLElement[]
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (!top?.target?.id) return
        const id = top.target.id.replace('section-', '') as TabId
        if (SECTIONS.some((s) => s.id === id)) setTab(id)
      },
      {
        root: null,
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0.08, 0.2, 0.4, 0.6],
      },
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [setTab])

  const onSelect = (id: TabId) => {
    setTab(id)
    scrollingRef.current = true
    scrollToSection(id)
    window.setTimeout(() => {
      scrollingRef.current = false
    }, 700)
  }

  return (
    <nav className="tabs-nav tabs-nav-sticky t-tabs-sliding" aria-label="Harbor sections">
      <div className="tabs-track" ref={trackRef} role="tablist">
        <span className="tabs-glider t-tabs-pill" ref={pillRef} aria-hidden="true" />
        {SECTIONS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            ref={(el) => {
              btnRefs.current[t.id] = el
            }}
            className={`tab-btn t-tab ${tab === t.id ? 'is-active' : ''}`}
            aria-selected={tab === t.id}
            aria-current={tab === t.id ? 'page' : undefined}
            onClick={() => onSelect(t.id)}
            data-testid={`tab-${t.id}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
