import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function AuthSplash() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "#F4F6FA",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 18,
          background: "linear-gradient(135deg, #6B8EFB, #A855F7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "8px 8px 20px rgba(91,124,250,0.35), -4px -4px 12px rgba(255,255,255,0.8)",
        }}
      >
        <Icon d={ic.cloud} size={26} color="#fff" strokeWidth={2} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#8B90A7" }}>Loading CloudVault…</div>
    </div>
  )
}
