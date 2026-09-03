"use client"

import type { ContextMenu, FileItem, QuickFolder } from "@/types"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"
import { isUuid } from "@/lib/folders/ids"

type MenuItem = { icon: string; label: string; color: string; action: () => void } | null

export function ContextMenuEl({
  ctx,
  onClose,
  onPreview,
  onRename,
  onOpenFolder,
  onMove,
  onTrash,
  onPermanentDelete,
  onRestore,
  onDownload,
  trashed,
}: {
  ctx: ContextMenu
  onClose: () => void
  onPreview: () => void
  onRename: () => void
  onOpenFolder: () => void
  onMove: () => void
  onTrash: () => void
  onPermanentDelete: () => void
  onRestore: () => void
  onDownload: () => void
  trashed: boolean
}) {
  const isFile = ctx.type === "file"
  const folder = !isFile && ctx.item ? (ctx.item as QuickFolder) : null
  const file = isFile && ctx.item ? (ctx.item as FileItem) : null
  const canManageFolder = Boolean(folder && isUuid(folder.id))
  const canManageFile = Boolean(file && isUuid(file.id))

  const menuItems: MenuItem[] = isFile
    ? trashed && canManageFile
      ? [
          { icon: "upload", label: "Restore", color: "#10B981", action: onRestore },
          null,
          { icon: "trash", label: "Delete forever", color: "#EF4444", action: onPermanentDelete },
        ]
      : canManageFile
        ? [
            { icon: "eye", label: "Preview", color: "#5B7CFA", action: onPreview },
            { icon: "download", label: "Download", color: "#10B981", action: onDownload },
            { icon: "rename", label: "Rename", color: "#0EA5E9", action: onRename },
            { icon: "move", label: "Move to", color: "#6B7280", action: onMove },
            null,
            { icon: "trash", label: "Move to Trash", color: "#EF4444", action: onTrash },
          ]
        : [{ icon: "eye", label: "Preview", color: "#5B7CFA", action: onPreview }]
    : trashed && canManageFolder
      ? [{ icon: "trash", label: "Delete forever", color: "#EF4444", action: onPermanentDelete }]
      : canManageFolder
        ? [
            { icon: "folder", label: "Open Folder", color: "#5B7CFA", action: onOpenFolder },
            { icon: "rename", label: "Rename", color: "#0EA5E9", action: onRename },
            { icon: "move", label: "Move to", color: "#6B7280", action: onMove },
            null,
            { icon: "trash", label: "Move to Trash", color: "#EF4444", action: onTrash },
          ]
        : [{ icon: "folder", label: "Open Folder", color: "#5B7CFA", action: onOpenFolder }]

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
              type="button"
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
