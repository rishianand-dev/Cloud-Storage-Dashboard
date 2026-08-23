"use client"

import { Avatar } from "@/components/ui/Avatar"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function SharedPanel({ onShare }: { onShare: (item: { name: string }) => void }) {
  const people = [
    { name: "Alex Kim", email: "alex@acme.io", avatar: "AK", color: "#5B7CFA", files: 18, role: "Editor" },
    { name: "Sarah Chen", email: "sarah@studio.co", avatar: "SC", color: "#A855F7", files: 7, role: "Viewer" },
    { name: "Marcus Lee", email: "marcus@brand.co", avatar: "ML", color: "#F59E0B", files: 12, role: "Editor" },
    { name: "Dev Team", email: "dev@cloudvault", avatar: "DT", color: "#10B981", files: 34, role: "Commenter" },
  ]
  const roleColor = { Editor: "#5B7CFA", Viewer: "#10B981", Commenter: "#F59E0B" } as Record<string, string>
  const roleBg = { Editor: "#EEF1FF", Viewer: "#EEFAF5", Commenter: "#FFF8EC" } as Record<string, string>

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 19, fontWeight: 700, color: "#1A1D2E" }}>Shared with me by</div>
        <button
          onClick={() => onShare({ name: "Shared folder" })}
          className="btn-primary"
          style={{
            padding: "9px 18px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Icon d={ic.plus} size={14} color="#fff" strokeWidth={2.5} /> Invite
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {people.map((p) => (
          <div
            key={p.email}
            className="file-card"
            style={{
              borderRadius: 18,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#F4F6FA",
              cursor: "pointer",
            }}
          >
            <Avatar initials={p.avatar} color={p.color} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E" }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "#8B90A7", marginTop: 2 }}>{p.email}</div>
            </div>
            <div style={{ fontSize: 12, color: "#8B90A7" }}>{p.files} files</div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 8,
                background: roleBg[p.role],
                color: roleColor[p.role],
              }}
            >
              {p.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
