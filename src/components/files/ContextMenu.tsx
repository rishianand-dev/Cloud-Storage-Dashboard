"use client"

import type { ContextMenu } from "@/types"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function ContextMenuEl({
  ctx,
  onClose,
  onShare,
  onPreview,
  onRename,
}: {
  ctx: ContextMenu
  onClose: () => void
  onShare: () => void
  onPreview: () => void
  onRename: () => void
}) {
  const isFile = ctx.type === "file"
  const menuItems = isFile
    ? [
        { icon: "eye", label: "Preview", color: "#5B7CFA", action: onPreview },
        { icon: "edit", label: "Edit", color: "#5B7CFA", action: onClose },
        { icon: "download", label: "Download", color: "#10B981", action: onClose },
        { icon: "share", label: "Share", color: "#A855F7", action: onShare },
        { icon: "copy", label: "Make a copy", color: "#F59E0B", action: onClose },
        { icon: "move", label: "Move to", color: "#6B7280", action: onClose },
        { icon: "rename", label: "Rename", color: "#0EA5E9", action: onRename },
        { icon: "star", label: "Add to Favorites", color: "#F59E0B", action: onClose },
        null,
        { icon: "trash", label: "Move to Trash", color: "#EF4444", action: onClose },
      ]
    : [
        { icon: "folder", label: "Open Folder", color: "#5B7CFA", action: onClose },
        { icon: "share", label: "Share", color: "#A855F7", action: onShare },
        { icon: "download", label: "Download", color: "#10B981", action: onClose },
        { icon: "rename", label: "Rename", color: "#0EA5E9", action: onRename },
        { icon: "copy", label: "Make a copy", color: "#F59E0B", action: onClose },
        { icon: "move", label: "Move to", color: "#6B7280", action: onClose },
        null,
        { icon: "trash", label: "Move to Trash", color: "#EF4444", action: onClose },
      ]

  const maxY = typeof window !== "undefined" ? window.innerHeight - 400 : 400
  const maxX = typeof window !== "undefined" ? window.innerWidth - 220 : 220
  const top = Math.min(ctx.y, maxY)
  const left = Math.min(ctx.x, maxX)

  return (
    <>
      <Backdrop onClick={onClose} blur={false} />
      <ModalCard style={{ top, left, width: 210, padding: 8 }}>
        {menuItems.map((item, i) =>
          item === null ? (
            <div key={`sep-${i}`} style={{ height: 1, background: "rgba(163,177,198,0.2)", margin: "6px 8px" }} />
          ) : (
            <button
              key={item.label}
              onClick={() => {
                item.action()
                onClose()
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                background: "transparent",
                color: item.color === "#EF4444" ? "#EF4444" : "#1A1D2E",
                fontSize: 13.5,
                fontWeight: 500,
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  item.color === "#EF4444" ? "rgba(239,68,68,0.07)" : "rgba(255,255,255,0.7)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 9,
                  background: `${item.color}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon d={ic[item.icon] || ic.folder} size={13} color={item.color} />
              </div>
              {item.label}
            </button>
          ),
        )}
      </ModalCard>
    </>
  )
}
