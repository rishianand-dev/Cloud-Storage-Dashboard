"use client"

import { useState } from "react"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Avatar } from "@/components/ui/Avatar"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function ShareModal({ item, onClose }: { item: { name: string }; onClose: () => void }) {
  const [input, setInput] = useState("")
  const [perm, setPerm] = useState("viewer")
  const [linkCopied, setLinkCopied] = useState(false)
  const shared = [
    { name: "Alex Kim", email: "alex@acme.io", avatar: "AK", color: "#5B7CFA", role: "Editor" },
    { name: "Sarah Chen", email: "sarah@studio.co", avatar: "SC", color: "#A855F7", role: "Viewer" },
  ]

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalCard style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 480, padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 19, fontWeight: 800, color: "#1A1D2E" }}>Share</div>
            <div style={{ fontSize: 12.5, color: "#8B90A7", marginTop: 2 }}>{item.name}</div>
          </div>
          <button
            onClick={onClose}
            className="icon-btn"
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F4F6FA",
            }}
          >
            <Icon d={ic.x} size={16} color="#8B90A7" />
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add people by email..."
            className="neu-field"
            style={{
              flex: 1,
              padding: "11px 16px",
              borderRadius: 14,
              fontSize: 13.5,
            }}
          />
          <select
            value={perm}
            onChange={(e) => setPerm(e.target.value)}
            className="neu-field"
            style={{
              padding: "11px 12px",
              borderRadius: 14,
              fontSize: 13,
            }}
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="commenter">Commenter</option>
          </select>
          <button
            className="btn-primary"
            style={{
              padding: "11px 18px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontSize: 13.5,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            Invite
          </button>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#8B90A7",
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Shared with
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {shared.map((p) => (
              <div
                key={p.email}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 14,
                  background: "#F4F6FA",
                  boxShadow: "4px 4px 10px rgba(163,177,198,0.3), -3px -3px 8px rgba(255,255,255,0.8)",
                }}
              >
                <Avatar initials={p.avatar} color={p.color} size={34} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1A1D2E" }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: "#8B90A7" }}>{p.email}</div>
                </div>
                <select
                  defaultValue={p.role.toLowerCase()}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 9,
                    border: "none",
                    background: `${p.color}12`,
                    color: p.color,
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="commenter">Commenter</option>
                </select>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            background: "#F4F6FA",
            borderRadius: 16,
            padding: "14px 16px",
            boxShadow: "4px 4px 10px rgba(163,177,198,0.3), -3px -3px 8px rgba(255,255,255,0.8)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon d={ic.link} size={16} color="#5B7CFA" />
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1A1D2E" }}>Shareable Link</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#EEF1FF",
                borderRadius: 8,
                padding: "4px 10px",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B7CFA" }} />
              <span style={{ fontSize: 11.5, color: "#5B7CFA", fontWeight: 600 }}>Anyone with link</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                flex: 1,
                padding: "9px 12px",
                borderRadius: 10,
                background: "rgba(163,177,198,0.12)",
                fontSize: 12,
                color: "#8B90A7",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              https://cloudvault.io/share/abc123xyz
            </div>
            <button
              onClick={() => setLinkCopied(true)}
              className="action-btn"
              style={{
                padding: "9px 16px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 12.5,
                fontWeight: 700,
                color: linkCopied ? "#10B981" : "#5B7CFA",
                background: "#F4F6FA",
                whiteSpace: "nowrap",
              }}
            >
              {linkCopied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </ModalCard>
    </>
  )
}
