"use client"

import { useState } from "react"
import Link from "next/link"
import { ProfileForm } from "@/components/account/ProfileForm"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"
import { getAccountMenuItem, getNotifications } from "@/lib/data"
import type { AccountTabId } from "@/types"

function Field({
  label,
  value,
  editable = false,
}: {
  label: string
  value: string
  editable?: boolean
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#8B90A7",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      {editable ? (
        <input
          defaultValue={value}
          className="neu-field"
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 600,
          }}
        />
      ) : (
        <div
          className="neu-field"
          style={{
            padding: "12px 16px",
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 600,
            color: "#1A1D2E",
          }}
        >
          {value}
        </div>
      )}
    </div>
  )
}

function ToggleRow({ label, description, defaultOn = true }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        borderRadius: 16,
        background: "#F4F6FA",
        boxShadow: "4px 4px 10px rgba(163,177,198,0.25), -3px -3px 8px rgba(255,255,255,0.85)",
        marginBottom: 10,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E" }}>{label}</div>
        <div style={{ fontSize: 12, color: "#8B90A7", marginTop: 2 }}>{description}</div>
      </div>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        style={{
          width: 44,
          height: 26,
          borderRadius: 13,
          border: "none",
          cursor: "pointer",
          background: on ? "linear-gradient(135deg, #6B8EFB, #5B7CFA)" : "rgba(163,177,198,0.35)",
          position: "relative",
          transition: "background 0.2s ease",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: on ? 21 : 3,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "2px 2px 6px rgba(26,29,46,0.2)",
            transition: "left 0.2s ease",
          }}
        />
      </button>
    </div>
  )
}

export function AccountPanel({ tab }: { tab: AccountTabId }) {
  const meta = getAccountMenuItem(tab)
  const notifications = getNotifications()

  return (
    <div
      className="neu-card"
      style={{
        borderRadius: 24,
        background: "linear-gradient(160deg, #F7F9FD 0%, #F0F3FA 100%)",
        padding: "28px 28px 32px",
        boxShadow:
          "16px 16px 40px rgba(163,177,198,0.4), -10px -10px 24px rgba(255,255,255,0.95)",
        minHeight: 420,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            background: `${meta.color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon d={ic[meta.icon]} size={20} color={meta.color} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1A1D2E", letterSpacing: "-0.3px" }}>
            {meta.label}
          </h2>
          <div style={{ fontSize: 13, color: "#8B90A7", marginTop: 2 }}>{meta.description}</div>
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(163,177,198,0.2)", margin: "22px 0" }} />

      {tab === "profile" && <ProfileForm />}

      {tab === "settings" && (
        <>
          <Field label="Display language" value="English (US)" editable />
          <Field label="Timezone" value="Asia/Kolkata (IST)" editable />
          <ToggleRow label="Dark mode" description="Use a darker interface when available" defaultOn={false} />
          <ToggleRow label="Compact file list" description="Show denser rows in list view" />
          <ToggleRow label="Show storage tips" description="Occasional upgrade and cleanup suggestions" />
          <button
            type="button"
            className="btn-primary"
            style={{
              marginTop: 16,
              padding: "12px 22px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Save settings
          </button>
        </>
      )}

      {tab === "notifications" && (
        <>
          <ToggleRow label="File shares" description="When someone shares a file or folder with you" />
          <ToggleRow label="Comments" description="Mentions and comments on your files" />
          <ToggleRow label="Upload complete" description="When large uploads finish" defaultOn={false} />
          <ToggleRow label="Weekly summary" description="Storage and activity digest every Monday" />
          <div style={{ marginTop: 20, marginBottom: 10, fontSize: 13, fontWeight: 700, color: "#1A1D2E" }}>
            Recent alerts
          </div>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 14,
                background: n.unread ? "rgba(91,124,250,0.04)" : "#F4F6FA",
                boxShadow: "3px 3px 8px rgba(163,177,198,0.2), -2px -2px 6px rgba(255,255,255,0.8)",
                marginBottom: 8,
              }}
            >
              <div style={{ flex: 1, fontSize: 13, color: "#1A1D2E", lineHeight: 1.45 }}>{n.text}</div>
              <div style={{ fontSize: 11, color: "#C4C9DC", whiteSpace: "nowrap" }}>{n.time}</div>
            </div>
          ))}
        </>
      )}

      {tab === "privacy" && (
        <>
          <ToggleRow label="Two-factor authentication" description="Require a code when signing in" />
          <ToggleRow label="Login alerts" description="Email me about new device sign-ins" />
          <ToggleRow
            label="Link sharing default"
            description="Anyone with the link can view new shares"
            defaultOn={false}
          />
          <div
            style={{
              marginTop: 12,
              padding: "16px 18px",
              borderRadius: 16,
              background: "#F4F6FA",
              boxShadow: "4px 4px 10px rgba(163,177,198,0.25), -3px -3px 8px rgba(255,255,255,0.85)",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E", marginBottom: 6 }}>Password</div>
            <div style={{ fontSize: 12.5, color: "#8B90A7", marginBottom: 12 }}>
              Last changed 42 days ago
            </div>
            <Link
              href="/forgot-password"
              className="action-btn"
              style={{
                display: "inline-block",
                padding: "10px 16px",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 700,
                color: "#5B7CFA",
                background: "#F4F6FA",
                textDecoration: "none",
              }}
            >
              Change password
            </Link>
          </div>
        </>
      )}

      {tab === "help" && (
        <>
          {[
            { q: "How do I share a folder?", a: "Right-click any folder and choose Share, or use the Share Folder button in the details panel." },
            { q: "What happens to files in Trash?", a: "Deleted files stay in Trash for 30 days, then are permanently removed." },
            { q: "How do I upgrade storage?", a: "Open the Storage card in the sidebar and choose Upgrade Storage." },
          ].map((item) => (
            <div
              key={item.q}
              style={{
                padding: "16px 18px",
                borderRadius: 16,
                background: "#F4F6FA",
                boxShadow: "4px 4px 10px rgba(163,177,198,0.25), -3px -3px 8px rgba(255,255,255,0.85)",
                marginBottom: 10,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E", marginBottom: 6 }}>{item.q}</div>
              <div style={{ fontSize: 13, color: "#8B90A7", lineHeight: 1.55 }}>{item.a}</div>
            </div>
          ))}
          <button
            type="button"
            className="btn-primary"
            style={{
              marginTop: 12,
              padding: "12px 22px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon d={ic.msg} size={15} color="#fff" /> Contact support
          </button>
        </>
      )}
    </div>
  )
}
