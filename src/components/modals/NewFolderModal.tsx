"use client"

import { useState } from "react"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function NewFolderModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("Untitled Folder")
  const [color, setColor] = useState("#5B7CFA")
  const colors = ["#5B7CFA", "#A855F7", "#10B981", "#F59E0B", "#EC4899", "#EF4444", "#0EA5E9", "#6B7280"]

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalCard style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 380, padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#1A1D2E" }}>New Folder</div>
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
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: `${color}18`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `8px 8px 20px ${color}25, -6px -6px 14px rgba(255,255,255,0.9)`,
              transition: "all 0.3s ease",
            }}
          >
            <Icon d={ic.folder} size={36} color={color} strokeWidth={1.4} />
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#8B90A7",
              marginBottom: 8,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Folder Name
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => e.target.select()}
            className="neu-field"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 600,
            }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#8B90A7",
              marginBottom: 10,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Folder Color
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 9,
                  border: color === c ? `3px solid ${c}` : "3px solid transparent",
                  background: c,
                  cursor: "pointer",
                  boxShadow: color === c ? `0 0 0 2px white, 3px 3px 8px ${c}50` : `2px 2px 6px ${c}30`,
                  transition: "all 0.2s ease",
                  transform: color === c ? "scale(1.15)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
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
            Create Folder
          </button>
        </div>
      </ModalCard>
    </>
  )
}
