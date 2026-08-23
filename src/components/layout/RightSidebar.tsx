"use client"

import type { QuickFolder } from "@/types"
import { Avatar } from "@/components/ui/Avatar"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"
import { useAuth } from "@/hooks/useAuth"

export function RightSidebar({
  folder,
  onClose,
  onShare,
}: {
  folder: QuickFolder
  onClose?: () => void
  onShare: (item: { name: string }) => void
}) {
  const { account } = useAuth()
  const activity = [
    { user: "Alex Kim", action: "commented on", file: "Project Proposal", time: "10m ago", avatar: "AK", color: "#5B7CFA" },
    { user: "Sarah Chen", action: "edited", file: "Design Spec", time: "1h ago", avatar: "SC", color: "#A855F7" },
    { user: "You", action: "uploaded", file: "Campaign Assets", time: "3h ago", avatar: account.initials, color: "#10B981" },
  ]

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E" }}>Details</div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            title="Close details"
            className="icon-btn"
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F4F6FA",
              flexShrink: 0,
            }}
          >
            <Icon d={ic.x} size={16} color="#8B90A7" />
          </button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 28,
            background: folder.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `10px 10px 24px ${folder.color}25, -6px -6px 16px rgba(255,255,255,0.9)`,
            marginBottom: 14,
            transition: "all 0.4s ease",
          }}
        >
          <Icon d={ic.folder} size={48} color={folder.color} strokeWidth={1.4} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#1A1D2E", letterSpacing: "-0.3px" }}>{folder.name}</div>
        <div style={{ fontSize: 12, color: "#8B90A7", marginTop: 4 }}>{folder.count} items</div>
        <div style={{ display: "flex", marginTop: 14, alignItems: "center" }}>
          {[
            { i: "AK", c: "#5B7CFA" },
            { i: "SC", c: "#A855F7" },
            { i: "ML", c: "#F59E0B" },
          ].map((m, idx) => (
            <div key={idx} style={{ marginLeft: idx > 0 ? -10 : 0, borderRadius: 10, border: "2px solid #F4F6FA" }}>
              <Avatar initials={m.i} color={m.c} size={30} />
            </div>
          ))}
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              marginLeft: -10,
              background: "#F4F6FA",
              border: "2px solid #F4F6FA",
              boxShadow: "3px 3px 8px rgba(163,177,198,0.3), -2px -2px 5px rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              fontWeight: 700,
              color: "#8B90A7",
            }}
          >
            +5
          </div>
        </div>
      </div>
      <div className="neu-card" style={{ borderRadius: 18, padding: "16px", background: "#F4F6FA", marginBottom: 18 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1A1D2E", marginBottom: 12 }}>Details</div>
        {(
          [
            ["Owner", account.name],
            ["Created", "Jan 12, 2025"],
            ["Modified", folder.modified],
            ["Location", "My Drive"],
            ["Storage", "4.2 GB"],
          ] as const
        ).map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
            <span style={{ fontSize: 12, color: "#8B90A7" }}>{l}</span>
            <span style={{ fontSize: 12, color: "#1A1D2E", fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1A1D2E", marginBottom: 14 }}>Activity</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {activity.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Avatar initials={item.avatar} color={item.color} size={28} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, color: "#1A1D2E", lineHeight: 1.4 }}>
                  <span style={{ fontWeight: 700 }}>{item.user}</span>
                  <span style={{ color: "#8B90A7" }}> {item.action} </span>
                  <span style={{ fontWeight: 600, color: "#5B7CFA" }}>{item.file}</span>
                </div>
                <div style={{ fontSize: 10.5, color: "#C4C9DC", marginTop: 2 }}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={() => onShare({ name: folder.name })}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 14,
            border: "none",
            color: "#fff",
            fontSize: 13.5,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Icon d={ic.share} size={15} color="#fff" strokeWidth={2.2} /> Share Folder
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="action-btn"
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 14,
              border: "none",
              color: "#5A5F7A",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: "#F4F6FA",
            }}
          >
            <Icon d={ic.download} size={14} color="#8B90A7" /> Download
          </button>
          <button
            className="icon-btn"
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F4F6FA",
            }}
          >
            <Icon d={ic.moreV} size={16} color="#8B90A7" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </>
  )
}
