export function Icon({
  d,
  size = 18,
  color = "currentColor",
  strokeWidth = 1.7,
  fill = "none",
}: {
  d: string
  size?: number
  color?: string
  strokeWidth?: number
  fill?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  )
}
