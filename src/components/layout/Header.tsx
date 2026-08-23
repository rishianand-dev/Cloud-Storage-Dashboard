"use client"

import type { RefObject } from "react"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"
import { UserAvatar } from "@/components/ui/UserAvatar"
import { useAuth } from "@/hooks/useAuth"
import type { ModalType } from "@/types"

export function Header({
  isMobile,
  hideSidebars,
  modal,
  rightSidebarVisible,
  onOpenSidebar,
  onOpenRight,
  onToggleRight,
  onToggleModal,
  profileRef,
  bellRef,
}: {
  isMobile: boolean
  hideSidebars: boolean
  modal: ModalType
  rightSidebarVisible: boolean
  onOpenSidebar: () => void
  onOpenRight: () => void
  onToggleRight: () => void
  onToggleModal: (type: ModalType) => void
  profileRef: RefObject<HTMLDivElement | null>
  bellRef: RefObject<HTMLDivElement | null>
}) {
  const { account } = useAuth()
  return (
    <>
      <header
        style={{
          padding: isMobile ? "14px 16px 0" : "20px 28px 0",
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 10 : 16,
          flexShrink: 0,
        }}
      >
        {hideSidebars && (
          <button
            className="icon-btn"
            onClick={onOpenSidebar}
            style={{
              width: 42,
              height: 42,
              borderRadius: 13,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F4F6FA",
              flexShrink: 0,
            }}
          >
            <Icon d={ic.menu} size={18} color="#5A5F7A" />
          </button>
        )}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "linear-gradient(135deg, #6B8EFB, #A855F7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "4px 4px 10px rgba(91,124,250,0.3)",
              }}
            >
              <Icon d={ic.cloud} size={17} color="#fff" strokeWidth={2} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#1A1D2E" }}>CloudVault</span>
          </div>
        )}
        {!isMobile && (
          <div
            className="search-bar"
            style={{
              flex: 1,
              maxWidth: 580,
              borderRadius: 16,
              padding: "0 8px 0 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 46,
              boxSizing: "border-box",
            }}
          >
            <Icon d={ic.search} size={16} color="#8B90A7" />
            <input
              placeholder="Search files, folders or people..."
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 14,
                color: "#1A1D2E",
                fontFamily: "inherit",
                height: "100%",
                padding: "0 4px",
              }}
            />
            <kbd
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 26,
                padding: "0 8px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(163,177,198,0.28)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.9)",
                fontSize: 11,
                color: "#8B90A7",
                fontWeight: 600,
                fontFamily: "inherit",
                letterSpacing: "0.02em",
                flexShrink: 0,
              }}
            >
              ⌘K
            </kbd>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10, marginLeft: "auto" }}>
          {isMobile && (
            <button
              className="icon-btn"
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F4F6FA",
              }}
            >
              <Icon d={ic.search} size={17} color="#5A5F7A" />
            </button>
          )}
          <div ref={bellRef} style={{ position: "relative" }}>
            <button
              className="icon-btn"
              onClick={() => onToggleModal(modal === "notifications" ? null : "notifications")}
              style={{
                width: isMobile ? 38 : 42,
                height: isMobile ? 38 : 42,
                borderRadius: 13,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F4F6FA",
              }}
            >
              <Icon d={ic.bell} size={18} color="#5A5F7A" />
            </button>
            <div
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                width: 16,
                height: 16,
                borderRadius: 8,
                background: "linear-gradient(135deg,#EF4444,#F97316)",
                color: "#fff",
                fontSize: 9,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              3
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <button
              className="icon-btn"
              style={{
                width: isMobile ? 38 : 42,
                height: isMobile ? 38 : 42,
                borderRadius: 13,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F4F6FA",
              }}
            >
              <Icon d={ic.msg} size={18} color="#5A5F7A" />
            </button>
            <div
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                width: 16,
                height: 16,
                borderRadius: 8,
                background: "linear-gradient(135deg,#EF4444,#F97316)",
                color: "#fff",
                fontSize: 9,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              1
            </div>
          </div>
          {!isMobile && (
            <button
              className="icon-btn"
              style={{
                width: 42,
                height: 42,
                borderRadius: 13,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F4F6FA",
              }}
            >
              <Icon d={ic.apps} size={18} color="#5A5F7A" />
            </button>
          )}
          <div ref={profileRef} onClick={() => onToggleModal(modal === "profile" ? null : "profile")} style={{ cursor: "pointer" }}>
            <UserAvatar
              name={account.name}
              initials={account.initials}
              image={account.image}
              size={isMobile ? 38 : 42}
              radius={13}
            />
          </div>

          {(hideSidebars || !rightSidebarVisible) && (
            <button
              type="button"
              className="icon-btn"
              onClick={hideSidebars ? onOpenRight : onToggleRight}
              aria-label="Show details"
              title="Show details"
              style={{
                width: isMobile || hideSidebars ? 38 : 42,
                height: isMobile || hideSidebars ? 38 : 42,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F4F6FA",
              }}
            >
              <Icon d={ic.info} size={17} color="#5A5F7A" />
            </button>
          )}
        </div>
      </header>
      {isMobile && (
        <div style={{ padding: "12px 16px 0" }}>
          <div
            className="search-bar"
            style={{
              borderRadius: 14,
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 42,
              boxSizing: "border-box",
            }}
          >
            <Icon d={ic.search} size={15} color="#8B90A7" />
            <input
              placeholder="Search files..."
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 13.5,
                color: "#1A1D2E",
                fontFamily: "inherit",
                height: "100%",
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
