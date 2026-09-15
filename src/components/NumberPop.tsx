export function NumberPop({ value, label }: { value: number | string; label?: string }) {
  const digits = String(value).split('')
  return (
    <span
      className="number-pop"
      aria-label={label ? `${label} ${value}` : String(value)}
      key={String(value)}
    >
      {digits.map((d, i) => (
        <span key={`${value}-${d}-${i}`} className="t-number-pop-in" style={{ ['--i' as string]: i }}>
          {d}
        </span>
      ))}
    </span>
  )
}
