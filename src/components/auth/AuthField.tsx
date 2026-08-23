"use client"

import type { InputHTMLAttributes, ReactNode } from "react"
import { Icon } from "@/components/ui/Icon"

export function AuthField({
  label,
  icon,
  error,
  trailing,
  ...inputProps
}: {
  label: string
  icon: string
  error?: string
  trailing?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
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
      <div className="neu-field" style={{ borderRadius: 14, display: "flex", alignItems: "center", padding: "0 14px" }}>
        <Icon d={icon} size={16} color="#8B90A7" />
        <input
          {...inputProps}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 14,
            fontWeight: 600,
            color: "#1A1D2E",
            fontFamily: "inherit",
            height: 48,
            padding: "0 10px",
            minWidth: 0,
          }}
        />
        {trailing}
      </div>
      {error && (
        <div style={{ fontSize: 12, color: "#EF4444", fontWeight: 600, marginTop: 6 }}>{error}</div>
      )}
    </label>
  )
}
