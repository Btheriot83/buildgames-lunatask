export function LoadingShell({ revealed }: { revealed: boolean }) {
  return (
    <div className={`loading-shell t-skeleton-reveal ${revealed ? 'is-gone' : ''}`} aria-hidden={revealed}>
      <div className="skel-block skel-brand" />
      <div className="skel-row">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="skel-chip" />
        ))}
      </div>
      <div className="skel-block skel-main" />
    </div>
  )
}
