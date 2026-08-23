"use client"

import Link from "next/link"
import { Icon } from "@/components/ui/Icon"
import { StorageRing } from "@/components/ui/StorageRing"
import { ic } from "@/lib/constants/icons"
import { getNavItems } from "@/lib/data"
import { UserAvatar } from "@/components/ui/UserAvatar"
import { useAuth } from "@/hooks/useAuth"
import type { NavId } from "@/types"

export function Sidebar({
  activeNav,
  onNew,
  onClose,
  isDrawer,
}: {
  activeNav: NavId
  onNew: () => void
  onClose?: () => void
  isDrawer: boolean
}) {
  const navItems = getNavItems()
  const { account } = useAuth()
  const storagePct = Math.round((account.storageUsedGb / account.storageTotalGb) * 100)

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 13,
            flexShrink: 0,
            background: "linear-gradient(135deg, #6B8EFB, #A855F7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "6px 6px 14px rgba(91,124,250,0.35), -3px -3px 8px rgba(255,255,255,0.7)",
          }}
        >
          <Icon d={ic.cloud} size={22} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#1A1D2E", letterSpacing: "-0.3px" }}>
            CloudVault
          </div>
          <div style={{ fontSize: 10.5, color: "#8B90A7", fontWeight: 500 }}>Your files everywhere</div>
        </div>
        {isDrawer && onClose && (
          <button
            onClick={onClose}
            style={{ marginLeft: "auto", background: "transparent", border: "none", cursor: "pointer", padding: 4 }}
          >
            <Icon d={ic.x} size={20} color="#8B90A7" />
          </button>
        )}
      </div>
      <button
        onClick={onNew}
        className="btn-primary"
        style={{
          width: "100%",
          padding: "13px 0",
          borderRadius: 16,
          border: "none",
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginTop: 20,
          marginBottom: 28,
          letterSpacing: "-0.1px",
        }}
      >
        <Icon d={ic.plus} size={18} color="#fff" strokeWidth={2.5} /> New
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#8B90A7",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            padding: "0 10px",
            marginBottom: 6,
          }}
        >
          Main
        </div>
        {navItems.map((item) => {
          const active = activeNav === item.id
          return (
            <Link
              key={item.id}
              href={`/${item.id}`}
              onClick={() => onClose?.()}
              className={`nav-item ${active ? "nav-item-active" : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                border: "none",
                cursor: "pointer",
                background: active ? undefined : "transparent",
                color: active ? "#5B7CFA" : "#5A5F7A",
                fontSize: 14,
                fontWeight: active ? 600 : 500,
                textAlign: "left",
                width: "100%",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: active ? "rgba(91,124,250,0.12)" : "rgba(255,255,255,0.5)",
                  boxShadow: active
                    ? "inset 3px 3px 7px rgba(91,124,250,0.15), inset -2px -2px 5px rgba(255,255,255,0.6)"
                    : "3px 3px 8px rgba(163,177,198,0.3), -2px -2px 5px rgba(255,255,255,0.75)",
                }}
              >
                <Icon d={ic[item.icon]} size={16} color={active ? "#5B7CFA" : "#8B90A7"} />
              </div>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge > 0 && (
                <div
                  style={{
                    background: "linear-gradient(135deg, #5B7CFA, #A855F7)",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: 20,
                  }}
                >
                  {item.badge}
                </div>
              )}
            </Link>
          )
        })}
      </div>
      <div className="neu-card" style={{ borderRadius: 22, padding: "20px 18px", marginTop: 24, background: "#F4F6FA" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#1A1D2E", marginBottom: 14 }}>Storage</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <StorageRing pct={storagePct} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E" }}>{account.storageUsedGb} GB</div>
            <div style={{ fontSize: 11, color: "#8B90A7", marginTop: 2 }}>of {account.storageTotalGb} GB used</div>
            <div
              style={{
                marginTop: 8,
                borderRadius: 6,
                height: 5,
                overflow: "hidden",
                boxShadow:
                  "inset 3px 3px 7px rgba(163,177,198,0.4), inset -2px -2px 5px rgba(255,255,255,0.8)",
              }}
            >
              <div
                style={{
                  width: `${storagePct}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #5B7CFA, #A855F7)",
                  borderRadius: 6,
                }}
              />
            </div>
          </div>
        </div>
        <button
          className="action-btn"
          style={{
            width: "100%",
            marginTop: 14,
            padding: "9px 0",
            borderRadius: 12,
            border: "none",
            color: "#5B7CFA",
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer",
            background: "#F4F6FA",
          }}
        >
          Upgrade Storage ↑
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, padding: "12px 10px" }}>
        <UserAvatar name={account.name} initials={account.initials} image={account.image} size={38} radius={12} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#1A1D2E",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {account.name}
          </div>
          <div
            style={{
              fontSize: 10.5,
              color: "#8B90A7",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {account.email}
          </div>
        </div>
        <Link
          href="/account/settings"
          className="icon-btn"
          aria-label="Account settings"
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon d={ic.settings} size={15} color="#8B90A7" />
        </Link>
      </div>
    </>
  )
}
