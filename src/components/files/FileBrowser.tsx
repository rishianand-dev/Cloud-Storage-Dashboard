"use client"

import { useMemo } from "react"
import type { FileItem, NavId, ViewMode } from "@/types"
import { EmptyState } from "@/components/ui/EmptyState"
import { FileTypeIcon } from "@/components/ui/FileTypeIcon"
import { Icon } from "@/components/ui/Icon"
import { StarButton } from "@/components/ui/StarButton"
import { ic } from "@/lib/constants/icons"
import { getFilesBySection, getFilesSectionTitle, getSectionMeta } from "@/lib/data"
import { compareSortValues, modifiedRank, sizeToBytes } from "@/lib/sort"

export function FileBrowser({
  section,
  viewMode,
  sortBy,
  sortAscending,
  isMobile,
  isTablet,
  starredFiles,
  onToggleStar,
  onOpenPreview,
  onOpenContextMenu,
}: {
  section: NavId
  viewMode: ViewMode
  sortBy: string
  sortAscending: boolean
  isMobile: boolean
  isTablet: boolean
  starredFiles: Set<string>
  onToggleStar: (id: string) => void
  onOpenPreview: (file: FileItem) => void
  onOpenContextMenu: (e: React.MouseEvent, type: "file" | "folder", item: FileItem) => void
}) {
  const files = getFilesBySection(section, starredFiles)
  const visibleFiles = useMemo(() => {
    const valueFor = (file: FileItem): string | number => {
      switch (sortBy) {
        case "name":
          return file.name
        case "owner":
          return file.owner
        case "size":
          return sizeToBytes(file.size)
        case "type":
          return file.ext
        case "modified":
        default:
          return modifiedRank(file.modified)
      }
    }
    return [...files].sort((a, b) => compareSortValues(valueFor(a), valueFor(b), sortAscending))
  }, [files, sortBy, sortAscending])
  const meta = getSectionMeta(section)
  const title = getFilesSectionTitle(section)

  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ fontSize: 19, fontWeight: 700, color: "#1A1D2E", letterSpacing: "-0.2px" }}>{title}</div>
        {visibleFiles.length > 0 && (
          <button
            style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 13, color: "#5B7CFA", fontWeight: 600 }}
          >
            View all →
          </button>
        )}
      </div>

      {visibleFiles.length === 0 ? (
        <EmptyState icon={meta.emptyIcon} msg={meta.emptyMsg} desc={meta.emptyDesc} />
      ) : viewMode === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(3,1fr)" : "repeat(4,1fr)",
            gap: isMobile ? 12 : 16,
          }}
        >
          {visibleFiles.map((file, i) => (
            <div
              key={file.id}
              className="file-card"
              onContextMenu={(e) => onOpenContextMenu(e, "file", file)}
              onClick={() => onOpenPreview(file)}
              style={{
                borderRadius: 22,
                padding: isMobile ? "14px 12px" : "18px 16px",
                background: "#F4F6FA",
                cursor: "pointer",
                boxShadow: "10px 10px 24px rgba(163,177,198,0.5), -6px -6px 18px rgba(255,255,255,0.9)",
                animationDelay: `${i * 30}ms`,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <FileTypeIcon icon={file.icon} iconBg={file.iconBg} iconColor={file.iconColor} ext={file.ext} />
                <div style={{ display: "flex", gap: 2 }}>
                  <StarButton
                    starred={starredFiles.has(file.id)}
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleStar(file.id)
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenContextMenu(e, "file", file)
                    }}
                    style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2 }}
                  >
                    <Icon d={ic.moreV} size={15} color="#C4C9DC" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
              <div
                style={{
                  fontSize: isMobile ? 13 : 14,
                  fontWeight: 700,
                  color: "#1A1D2E",
                  marginBottom: 3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {file.name}
              </div>
              <div style={{ fontSize: 11.5, color: "#8B90A7", fontWeight: 500 }}>{file.owner}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <span style={{ fontSize: 11, color: "#C4C9DC" }}>{file.size}</span>
                <span style={{ fontSize: 11, color: "#C4C9DC" }}>{file.modified}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="neu-card" style={{ borderRadius: 22, overflow: "hidden", background: "#F4F6FA" }}>
          {visibleFiles.map((file, i) => (
            <div
              key={file.id}
              onContextMenu={(e) => onOpenContextMenu(e, "file", file)}
              onClick={() => onOpenPreview(file)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 10 : 14,
                padding: isMobile ? "12px 14px" : "14px 20px",
                borderBottom: i < visibleFiles.length - 1 ? "1px solid rgba(163,177,198,0.15)" : "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <FileTypeIcon icon={file.icon} iconBg={file.iconBg} iconColor={file.iconColor} ext={file.ext} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#1A1D2E",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {file.name}.{file.ext}
                </div>
                <div style={{ fontSize: 11.5, color: "#8B90A7", marginTop: 2 }}>
                  {file.owner} · {file.modified}
                </div>
              </div>
              {!isMobile && (
                <div style={{ fontSize: 12, color: "#8B90A7", minWidth: 60, textAlign: "right" }}>{file.size}</div>
              )}
              <StarButton
                starred={starredFiles.has(file.id)}
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleStar(file.id)
                }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenContextMenu(e, "file", file)
                }}
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}
              >
                <Icon d={ic.moreV} size={15} color="#C4C9DC" strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
