export function StorageRing({ pct }: { pct: number }) {
  const r = 36
  const cx = 44
  const cy = 44
  const stroke = 7
  const circ = 2 * Math.PI * r
  return (
    <svg width={88} height={88} className="storage-ring">
      <defs>
        <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B8EFB" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(163,177,198,0.25)" strokeWidth={stroke} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="url(#rg)"
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: "rotate(-90deg)",
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#5B7CFA" fontSize="13" fontWeight="700">
        {pct}%
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#8B90A7" fontSize="8.5">
        USED
      </text>
    </svg>
  )
}
