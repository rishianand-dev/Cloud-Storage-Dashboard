"use client"

import Link from "next/link"
import type { CSSProperties } from "react"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"
import { useAuth } from "@/hooks/useAuth"
import type { AccountMenuItem } from "@/types"

export function AccountMenuItemButton({
  item,
  active = false,
  onClick,
  asLink = true,
}: {
  item: AccountMenuItem
  active?: boolean
  onClick?: () => void
  asLink?: boolean
}) {
  const content = (
    <>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: `${item.color}12`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon d={ic[item.icon]} size={15} color={item.color} />
      </div>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1A1D2E" }}>{item.label}</span>
    </>
  )

  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    background: active ? "rgba(91,124,250,0.08)" : "transparent",
    textDecoration: "none",
    transition: "background 0.15s ease",
  }

  if (asLink) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        style={style}
        onMouseEnter={(e) => {
          if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.7)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = active ? "rgba(91,124,250,0.08)" : "transparent"
        }}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.7)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = active ? "rgba(91,124,250,0.08)" : "transparent"
      }}
    >
      {content}
    </button>
  )
}

export function AccountSignOutButton({ onClick }: { onClick?: () => void }) {
  const { logout } = useAuth()

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.()
        logout()
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        background: "transparent",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: "#FCE8E8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon d={ic.logout} size={15} color="#EF4444" />
      </div>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#EF4444" }}>Sign Out</span>
    </button>
  )
}
