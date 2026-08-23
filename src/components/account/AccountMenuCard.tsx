"use client"

import { AccountUserHeader } from "@/components/account/AccountUserHeader"
import { AccountMenuItemButton, AccountSignOutButton } from "@/components/account/AccountMenuItem"
import { getAccountMenuItems } from "@/lib/data"
import { useAuth } from "@/hooks/useAuth"
import type { AccountTabId } from "@/types"

export function AccountMenuCard({
  activeTab,
  onNavigate,
  onSignOut,
  compact = false,
}: {
  activeTab?: AccountTabId
  onNavigate?: () => void
  onSignOut?: () => void
  compact?: boolean
}) {
  const { account: user } = useAuth()
  const items = getAccountMenuItems()

  return (
    <div
      className="neu-card"
      style={{
        borderRadius: 24,
        background: "linear-gradient(160deg, #F7F9FD 0%, #F0F3FA 100%)",
        overflow: "hidden",
        width: compact ? 280 : "100%",
        maxWidth: compact ? 280 : 360,
        boxShadow:
          "20px 20px 60px rgba(163,177,198,0.45), -12px -12px 30px rgba(255,255,255,0.95), 0 0 0 1px rgba(255,255,255,0.6)",
      }}
    >
      <AccountUserHeader user={user} />
      <div style={{ padding: "10px 8px" }}>
        {items.map((item) => (
          <AccountMenuItemButton
            key={item.id}
            item={item}
            active={activeTab === item.id}
            onClick={onNavigate}
          />
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(163,177,198,0.15)", padding: "10px 8px" }}>
        <AccountSignOutButton onClick={onSignOut} />
      </div>
    </div>
  )
}
