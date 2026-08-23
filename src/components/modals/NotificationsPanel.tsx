"use client"

import type { RefObject } from "react"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Avatar } from "@/components/ui/Avatar"
import { getNotifications } from "@/lib/data"

export function NotificationsPanel({
  onClose,
  anchorRef,
}: {
  onClose: () => void
  anchorRef: RefObject<HTMLDivElement | null>
}) {
  const rect = anchorRef.current?.getBoundingClientRect()
  const top = rect ? rect.bottom + 10 : 80
  const left = rect ? Math.max(8, rect.left - 260) : 8
  const notifications = getNotifications()

  return (
    <>
      <Backdrop onClick={onClose} blur={false} />
      <ModalCard style={{ top, left, width: 340, padding: 0, overflow: "hidden" }}>
        <div
          style={{
            padding: "18px 20px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(163,177,198,0.15)",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1A1D2E" }}>Notifications</div>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#5B7CFA", fontWeight: 600 }}
          >
            Mark all read
          </button>
        </div>
        <div style={{ maxHeight: 380, overflowY: "auto" }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 20px",
                borderBottom: "1px solid rgba(163,177,198,0.1)",
                background: n.unread ? "rgba(91,124,250,0.03)" : "transparent",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.6)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = n.unread ? "rgba(91,124,250,0.03)" : "transparent")
              }
            >
              <Avatar initials={n.avatar} color={n.color} size={34} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#1A1D2E", lineHeight: 1.5 }}>{n.text}</div>
                <div style={{ fontSize: 11, color: "#C4C9DC", marginTop: 3 }}>{n.time}</div>
              </div>
              {n.unread && (
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#5B7CFA",
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "12px 20px",
            textAlign: "center",
            borderTop: "1px solid rgba(163,177,198,0.15)",
          }}
        >
          <button
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#5B7CFA", fontWeight: 600 }}
          >
            View all notifications →
          </button>
        </div>
      </ModalCard>
    </>
  )
}
