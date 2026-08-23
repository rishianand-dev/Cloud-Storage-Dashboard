"use client"

import type { RefObject } from "react"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function SortDropdown({
  onClose,
  anchorRef,
  current,
  onChange,
}: {
  onClose: () => void
  anchorRef: RefObject<HTMLButtonElement | null>
  current: string
  onChange: (v: string) => void
}) {
  const rect = anchorRef.current?.getBoundingClientRect()
  const top = rect ? rect.bottom + 10 : 200
  const left = rect ? rect.left : 300

  const opts = [
    { value: "name", label: "Name", icon: "sort" },
    { value: "modified", label: "Last Modified", icon: "clock" },
    { value: "size", label: "File Size", icon: "inbox" },
    { value: "type", label: "File Type", icon: "grid" },
    { value: "owner", label: "Owner", icon: "user" },
  ]

  return (
    <>
      <Backdrop onClick={onClose} blur={false} />
      <ModalCard style={{ top, left, width: 220, padding: 10 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#8B90A7",
            padding: "4px 10px 8px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Sort by
        </div>
        {opts.map((o) => (
          <button
            key={o.value}
            onClick={() => {
              onChange(o.value)
              onClose()
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 11,
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              background: current === o.value ? "#EEF1FF" : "transparent",
              color: current === o.value ? "#5B7CFA" : "#1A1D2E",
              fontSize: 13.5,
              fontWeight: current === o.value ? 700 : 500,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              if (current !== o.value) e.currentTarget.style.background = "rgba(255,255,255,0.7)"
            }}
            onMouseLeave={(e) => {
              if (current !== o.value) e.currentTarget.style.background = "transparent"
            }}
          >
            <Icon d={ic[o.icon]} size={15} color={current === o.value ? "#5B7CFA" : "#8B90A7"} />
            <span style={{ flex: 1 }}>{o.label}</span>
            {current === o.value && <Icon d={ic.check} size={14} color="#5B7CFA" />}
          </button>
        ))}
      </ModalCard>
    </>
  )
}
