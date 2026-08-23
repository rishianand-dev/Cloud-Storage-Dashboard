"use client"

import { useState, type RefObject } from "react"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function FilterPanel({
  onClose,
  anchorRef,
}: {
  onClose: () => void
  anchorRef: RefObject<HTMLButtonElement | null>
}) {
  const rect = anchorRef.current?.getBoundingClientRect()
  const top = rect ? rect.bottom + 10 : 200
  const left = rect ? rect.left : 200
  const [types, setTypes] = useState<string[]>([])
  const [dateRange, setDateRange] = useState("any")
  const [owner, setOwner] = useState("anyone")

  const fileTypes = [
    { id: "docs", label: "Documents", color: "#5B7CFA", icon: "doc" },
    { id: "images", label: "Images", color: "#A855F7", icon: "image" },
    { id: "videos", label: "Videos", color: "#EC4899", icon: "video" },
    { id: "audio", label: "Audio", color: "#0EA5E9", icon: "music" },
    { id: "sheets", label: "Sheets", color: "#10B981", icon: "sheet" },
    { id: "zip", label: "Archives", color: "#6B7280", icon: "inbox" },
  ]

  const toggleType = (id: string) =>
    setTypes((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))

  return (
    <>
      <Backdrop onClick={onClose} blur={false} />
      <ModalCard style={{ top, left, width: 320, padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1D2E" }}>Filter</div>
          <button
            onClick={() => {
              setTypes([])
              setDateRange("any")
              setOwner("anyone")
            }}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#5B7CFA", fontWeight: 600 }}
          >
            Reset all
          </button>
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#8B90A7",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          File Type
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 18 }}>
          {fileTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => toggleType(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 12px",
                borderRadius: 11,
                border: "none",
                cursor: "pointer",
                background: types.includes(t.id) ? `${t.color}15` : "#F4F6FA",
                boxShadow: types.includes(t.id)
                  ? `inset 3px 3px 7px ${t.color}20, inset -2px -2px 5px rgba(255,255,255,0.6)`
                  : "4px 4px 10px rgba(163,177,198,0.3), -3px -3px 8px rgba(255,255,255,0.8)",
                outline: types.includes(t.id) ? `1.5px solid ${t.color}50` : "1.5px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              <Icon d={ic[t.icon]} size={14} color={types.includes(t.id) ? t.color : "#8B90A7"} />
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: types.includes(t.id) ? t.color : "#5A5F7A",
                }}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#8B90A7",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Modified
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
          {(
            [
              ["any", "Any time"],
              ["today", "Today"],
              ["week", "This week"],
              ["month", "This month"],
              ["year", "This year"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setDateRange(val)}
              style={{
                padding: "7px 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 12.5,
                fontWeight: 600,
                background: dateRange === val ? "#EEF1FF" : "#F4F6FA",
                color: dateRange === val ? "#5B7CFA" : "#5A5F7A",
                boxShadow:
                  dateRange === val
                    ? "inset 3px 3px 7px rgba(91,124,250,0.12), inset -2px -2px 5px rgba(255,255,255,0.6)"
                    : "3px 3px 8px rgba(163,177,198,0.3), -2px -2px 6px rgba(255,255,255,0.8)",
                transition: "all 0.2s ease",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#8B90A7",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Owner
        </div>
        <div style={{ display: "flex", gap: 7, marginBottom: 20 }}>
          {(
            [
              ["anyone", "Anyone"],
              ["me", "Owned by me"],
              ["other", "Not me"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setOwner(val)}
              style={{
                flex: 1,
                padding: "7px 0",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: owner === val ? "#EEF1FF" : "#F4F6FA",
                color: owner === val ? "#5B7CFA" : "#5A5F7A",
                boxShadow:
                  owner === val
                    ? "inset 3px 3px 7px rgba(91,124,250,0.12), inset -2px -2px 5px rgba(255,255,255,0.6)"
                    : "3px 3px 8px rgba(163,177,198,0.3), -2px -2px 6px rgba(255,255,255,0.8)",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 14,
            border: "none",
            cursor: "pointer",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Apply Filters
          {types.length > 0 || dateRange !== "any" || owner !== "anyone"
            ? ` (${[
                types.length > 0 ? `${types.length} types` : null,
                dateRange !== "any" ? dateRange : null,
                owner !== "anyone" ? owner : null,
              ]
                .filter(Boolean)
                .join(", ")})`
            : ""}
        </button>
      </ModalCard>
    </>
  )
}
