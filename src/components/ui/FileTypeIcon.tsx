import { ic } from "@/lib/constants/icons"
import { Icon } from "@/components/ui/Icon"

export function FileTypeIcon({
  icon,
  iconBg,
  iconColor,
  ext,
  size = 52,
}: {
  icon: string
  iconBg: string
  iconColor: string
  ext: string
  size?: number
}) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.27,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `4px 4px 10px ${iconColor}18, -2px -2px 6px rgba(255,255,255,0.8)`,
        }}
      >
        <Icon d={ic[icon] || ic.doc} size={size * 0.42} color={iconColor} strokeWidth={1.8} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: -4,
          right: -4,
          background: iconColor,
          color: "#fff",
          fontSize: 8,
          fontWeight: 700,
          padding: "1px 4px",
          borderRadius: 5,
          textTransform: "uppercase",
          letterSpacing: "0.3px",
          boxShadow: `2px 2px 6px ${iconColor}40`,
        }}
      >
        {ext}
      </div>
    </div>
  )
}
