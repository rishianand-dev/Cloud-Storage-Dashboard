export function Avatar({
  initials,
  color,
  size = 32,
}: {
  initials: string
  color: string
  size?: number
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 3,
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        border: `2px solid ${color}33`,
        color,
        fontSize: size * 0.35,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}
