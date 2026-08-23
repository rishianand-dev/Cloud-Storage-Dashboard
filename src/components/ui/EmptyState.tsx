import { ic } from "@/lib/constants/icons"
import { Icon } from "@/components/ui/Icon"

export function EmptyState({ icon, msg, desc }: { icon: string; msg: string; desc: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 24,
          background: "#EEF1FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          boxShadow: "8px 8px 20px rgba(163,177,198,0.4), -6px -6px 14px rgba(255,255,255,0.85)",
        }}
      >
        <Icon d={ic[icon] || ic.cloud} size={36} color="#5B7CFA" strokeWidth={1.4} />
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#1A1D2E", marginBottom: 8 }}>{msg}</div>
      <div style={{ fontSize: 13.5, color: "#8B90A7", maxWidth: 280, lineHeight: 1.6 }}>{desc}</div>
    </div>
  )
}
