"use client"

import { useState } from "react"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"

export function RenameModal({ item, onClose }: { item: { name: string }; onClose: () => void }) {
  const [name, setName] = useState(item.name)
  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalCard style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 360, padding: 28 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#1A1D2E", marginBottom: 20 }}>Rename</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => e.target.select()}
          className="neu-field"
          style={{
            width: "100%",
            padding: "13px 16px",
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 20,
          }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            className="action-btn"
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              color: "#5A5F7A",
              fontSize: 14,
              fontWeight: 600,
              background: "#F4F6FA",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Rename
          </button>
        </div>
      </ModalCard>
    </>
  )
}
