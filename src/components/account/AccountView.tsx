"use client"

import { AccountMenuCard } from "@/components/account/AccountMenuCard"
import { AccountPanel } from "@/components/account/AccountPage"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import type { AccountTabId } from "@/types"

export function AccountView({ tab }: { tab: AccountTabId }) {
  const { isMobile } = useMediaQuery()

  return (
    <main
      style={{
        flex: 1,
        overflowY: "auto",
        padding: isMobile ? "20px 16px 32px" : "28px 32px 40px",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: isMobile ? 24 : 30,
            fontWeight: 800,
            color: "#1A1D2E",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          Account
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
          <span style={{ fontSize: 12.5, color: "#8B90A7", fontWeight: 500 }}>Home</span>
          <span style={{ color: "#C4C9DC" }}>/</span>
          <span style={{ fontSize: 12.5, color: "#5B7CFA", fontWeight: 600 }}>Account</span>
        </div>
        <div style={{ fontSize: 12.5, color: "#8B90A7", marginTop: 4 }}>
          Manage your CloudVault profile, security, and preferences
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "flex-start",
          gap: isMobile ? 20 : 28,
          maxWidth: 1100,
        }}
      >
        <div style={{ flexShrink: 0, width: isMobile ? "100%" : 300 }}>
          <AccountMenuCard activeTab={tab} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <AccountPanel tab={tab} />
        </div>
      </div>
    </main>
  )
}
