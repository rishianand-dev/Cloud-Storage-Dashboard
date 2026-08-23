import type { ReactNode } from "react"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

const highlights = [
  { icon: "lock", title: "Private by default", copy: "Your files stay encrypted and only you decide who sees them." },
  { icon: "cloud", title: "Everywhere you work", copy: "Pick up on any device with the same organized drive." },
  { icon: "zap", title: "Fast sharing", copy: "Invite teammates or send a link without leaving CloudVault." },
]

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        height: "100dvh",
        overflowY: "auto",
        background:
          "radial-gradient(ellipse at 12% 18%, rgba(91,124,250,0.14), transparent 46%), radial-gradient(ellipse at 88% 82%, rgba(168,85,247,0.12), transparent 42%), #F4F6FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 420px)",
          gap: 28,
          alignItems: "stretch",
        }}
        className="auth-shell"
      >
        <div
          className="auth-brand"
          style={{
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: "linear-gradient(135deg, #6B8EFB, #A855F7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "6px 6px 16px rgba(91,124,250,0.35), -3px -3px 10px rgba(255,255,255,0.8)",
              }}
            >
              <Icon d={ic.cloud} size={24} color="#fff" strokeWidth={2} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#1A1D2E", letterSpacing: "-0.4px" }}>
                CloudVault
              </div>
              <div style={{ fontSize: 12, color: "#8B90A7", fontWeight: 500 }}>Premium cloud storage</div>
            </div>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 38,
              lineHeight: 1.15,
              fontWeight: 800,
              color: "#1A1D2E",
              letterSpacing: "-0.8px",
            }}
          >
            Your files, beautifully organized.
          </h1>
          <p style={{ margin: "14px 0 28px", fontSize: 15, lineHeight: 1.6, color: "#8B90A7", maxWidth: 420 }}>
            Sign in to open your drive, or create a free account to start storing and sharing.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {highlights.map((item) => (
              <div
                key={item.title}
                className="neu-card"
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "14px 16px",
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.45)",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: "rgba(91,124,250,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon d={ic[item.icon]} size={17} color="#5B7CFA" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E" }}>{item.title}</div>
                  <div style={{ fontSize: 12.5, color: "#8B90A7", marginTop: 2, lineHeight: 1.45 }}>{item.copy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="neu-float"
          style={{
            borderRadius: 28,
            background: "linear-gradient(160deg, #F7F9FD 0%, #F0F3FA 100%)",
            padding: "32px 28px 28px",
            boxShadow:
              "20px 20px 50px rgba(163,177,198,0.4), -12px -12px 28px rgba(255,255,255,0.95)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#1A1D2E", letterSpacing: "-0.4px" }}>
            {title}
          </h2>
          <p style={{ margin: "8px 0 24px", fontSize: 13.5, color: "#8B90A7", lineHeight: 1.5 }}>{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  )
}
