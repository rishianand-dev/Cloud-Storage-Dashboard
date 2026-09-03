"use client"

import type { RefObject } from "react"
import type { NavId, ViewMode, ModalType } from "@/types"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"
import { getSectionMeta } from "@/lib/data"
import { QuickAccess } from "@/components/files/QuickAccess"
import { FileBrowser } from "@/components/files/FileBrowser"
import { SharedPanel } from "@/components/files/SharedPanel"
import type { FileItem, FolderBreadcrumb, QuickFolder, RootFile } from "@/types"

export function SectionContent({
  section,
  viewMode,
  sortBy,
  sortAscending,
  onSortColumn,
  modal,
  isMobile,
  isTablet,
  starredFiles,
  selectedFolderId,
  driveFolders,
  trashFolders,
  trashCount,
  driveFiles,
  trashFiles,
  recentFiles,
  breadcrumbs,
  filterRef,
  sortRef,
  onSetModal,
  onSetViewMode,
  onToggleStar,
  onSelectFolder,
  onOpenFolder,
  onGoToFolder,
  onEmptyTrash,
  onOpenPreview,
  onOpenShare,
  onOpenContextMenu,
}: {
  section: NavId
  viewMode: ViewMode
  sortBy: string
  sortAscending: boolean
  onSortColumn: (column: string) => void
  modal: ModalType
  isMobile: boolean
  isTablet: boolean
  starredFiles: Set<string>
  selectedFolderId: string
  driveFolders: QuickFolder[]
  trashFolders: QuickFolder[]
  trashCount: number
  driveFiles: FileItem[]
  trashFiles: FileItem[]
  recentFiles: FileItem[]
  breadcrumbs: FolderBreadcrumb[]
  filterRef: RefObject<HTMLButtonElement | null>
  sortRef: RefObject<HTMLButtonElement | null>
  onSetModal: (m: ModalType) => void
  onSetViewMode: (m: ViewMode) => void
  onToggleStar: (id: string) => void
  onSelectFolder: (folder: QuickFolder) => void
  onOpenFolder: (folder: QuickFolder) => void
  onGoToFolder: (id: string | null) => void
  onEmptyTrash: () => void
  onOpenPreview: (file: FileItem | RootFile) => void
  onOpenShare: (item: { name: string }) => void
  onOpenContextMenu: (
    e: React.MouseEvent,
    type: "file" | "folder",
    item: FileItem | QuickFolder | RootFile,
  ) => void
}) {
  const meta = getSectionMeta(section)

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: isMobile ? "20px 16px" : "24px 28px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: isMobile ? 24 : 30,
              fontWeight: 800,
              color: "#1A1D2E",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            {meta.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12.5, color: "#8B90A7", fontWeight: 500 }}>Home</span>
            {section === "drive" && breadcrumbs ? (
              breadcrumbs.map((crumb) => (
                <span key={crumb.id ?? "root"} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#C4C9DC" }}>/</span>
                  <button
                    type="button"
                    onClick={() => onGoToFolder(crumb.id)}
                    style={{
                      fontSize: 12.5,
                      color: crumb.id === (breadcrumbs[breadcrumbs.length - 1]?.id ?? null) ? "#5B7CFA" : "#8B90A7",
                      fontWeight: 600,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    {crumb.name}
                  </button>
                </span>
              ))
            ) : (
              <>
                <span style={{ color: "#C4C9DC" }}>/</span>
                <span style={{ fontSize: 12.5, color: "#5B7CFA", fontWeight: 600 }}>{meta.title}</span>
              </>
            )}
          </div>
          <div style={{ fontSize: 12.5, color: "#8B90A7", marginTop: 4 }}>{meta.subtitle}</div>
        </div>
        {section === "drive" && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={() => onSetModal("upload")}
              className="action-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: isMobile ? "8px 12px" : "10px 18px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                color: "#5A5F7A",
                fontSize: 13.5,
                fontWeight: 600,
                background: "#F4F6FA",
              }}
            >
              <Icon d={ic.upload} size={15} color="#5B7CFA" /> Upload
            </button>
            <button
              onClick={() => onSetModal("newFolder")}
              className="action-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: isMobile ? "8px 12px" : "10px 18px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                color: "#5A5F7A",
                fontSize: 13.5,
                fontWeight: 600,
                background: "#F4F6FA",
              }}
            >
              <Icon d={ic.folder} size={15} color="#5B7CFA" /> New Folder
            </button>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1 }} />
        <button
          ref={filterRef}
          onClick={() => onSetModal(modal === "filter" ? null : "filter")}
          className="action-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 14px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: "#5A5F7A",
            background: "#F4F6FA",
          }}
        >
          <Icon d={ic.filter} size={14} color="#8B90A7" /> Filter
        </button>
        <button
          ref={sortRef}
          onClick={() => onSetModal(modal === "sort" ? null : "sort")}
          className="action-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 14px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: "#5A5F7A",
            background: "#F4F6FA",
          }}
        >
          <Icon d={ic.sort} size={14} color="#8B90A7" /> {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
          <Icon d={ic.chevDown} size={12} color="#C4C9DC" />
        </button>
        <div
          className="icon-btn"
          style={{
            display: "flex",
            borderRadius: 999,
            overflow: "hidden",
            padding: 3,
            gap: 2,
            height: 40,
            alignItems: "center",
            background: "#F4F6FA",
          }}
        >
          {(["grid", "list"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onSetViewMode(mode)}
              aria-label={mode === "grid" ? "Card view" : "List view"}
              aria-pressed={viewMode === mode}
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: viewMode === mode ? "#6B8EFB" : "transparent",
                boxShadow: viewMode === mode ? "3px 3px 8px rgba(91,124,250,0.35)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              {mode === "grid" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={viewMode === mode ? "#fff" : "#8B90A7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={viewMode === mode ? "#fff" : "#8B90A7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="4" cy="6" r="1.2" fill={viewMode === mode ? "#fff" : "#8B90A7"} stroke="none" />
                  <circle cx="4" cy="12" r="1.2" fill={viewMode === mode ? "#fff" : "#8B90A7"} stroke="none" />
                  <circle cx="4" cy="18" r="1.2" fill={viewMode === mode ? "#fff" : "#8B90A7"} stroke="none" />
                  <line x1="9" y1="6" x2="20" y2="6" />
                  <line x1="9" y1="12" x2="20" y2="12" />
                  <line x1="9" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {section === "trash" && (
        <div
          className="neu-card"
          style={{
            borderRadius: 18,
            padding: "16px 20px",
            background: "#F4F6FA",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "#FCE8E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon d={ic.alert} size={18} color="#EF4444" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1A1D2E" }}>Items stay in Trash until you delete them</div>
            <div style={{ fontSize: 12, color: "#8B90A7", marginTop: 2 }}>
              {trashCount === 0
                ? "Trash is empty"
                : `${trashCount} ${trashCount === 1 ? "item" : "items"} ready to delete forever`}
            </div>
          </div>
          <button
            type="button"
            onClick={onEmptyTrash}
            disabled={trashCount === 0}
            className="action-btn"
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              border: "none",
              cursor: trashCount === 0 ? "default" : "pointer",
              color: "#EF4444",
              fontSize: 12.5,
              fontWeight: 700,
              background: "#F4F6FA",
              flexShrink: 0,
              opacity: trashCount === 0 ? 0.45 : 1,
            }}
          >
            Empty Trash
          </button>
        </div>
      )}
      {section === "offline" && (
        <div
          className="neu-card"
          style={{
            borderRadius: 18,
            padding: "16px 20px",
            background: "#F4F6FA",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div className="status-dot" style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1A1D2E" }}>Offline sync active</div>
            <div style={{ fontSize: 12, color: "#8B90A7" }}>
              3 files available without internet · Last synced 2 min ago
            </div>
          </div>
        </div>
      )}
      {section === "archive" && (
        <div
          className="neu-card"
          style={{
            borderRadius: 18,
            padding: "16px 20px",
            background: "#F4F6FA",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "#FFF8EC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon d={ic.archive} size={18} color="#F59E0B" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1A1D2E" }}>3 items archived</div>
            <div style={{ fontSize: 12, color: "#8B90A7" }}>
              Archived files don&apos;t count against your storage quota
            </div>
          </div>
        </div>
      )}

      {section === "shared" && <SharedPanel onShare={onOpenShare} />}

      {section === "drive" && (
        <QuickAccess
          isMobile={isMobile}
          isTablet={isTablet}
          viewMode={viewMode}
          sortBy={sortBy}
          sortAscending={sortAscending}
          onSortColumn={onSortColumn}
          folders={driveFolders}
          files={driveFiles}
          selectedFolderId={selectedFolderId}
          title={breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 1]?.name ?? "My Drive" : "My Drive"}
          emptyMsg="This folder is empty"
          emptyDesc="Upload a file or create a folder to get started."
          onSelectFolder={onSelectFolder}
          onOpenFolder={onOpenFolder}
          onOpenFile={onOpenPreview}
          onOpenContextMenu={onOpenContextMenu}
        />
      )}

      {section === "trash" && (
        <QuickAccess
          isMobile={isMobile}
          isTablet={isTablet}
          viewMode={viewMode}
          sortBy={sortBy}
          sortAscending={sortAscending}
          onSortColumn={onSortColumn}
          folders={trashFolders}
          files={trashFiles}
          selectedFolderId={selectedFolderId}
          title="Trash"
          emptyIcon="trash"
          emptyMsg="Trash is empty"
          emptyDesc="Files and folders you delete will appear here until you delete them forever."
          onSelectFolder={onSelectFolder}
          onOpenFolder={onSelectFolder}
          onOpenContextMenu={onOpenContextMenu}
        />
      )}

      {section === "recent" && (
        <QuickAccess
          isMobile={isMobile}
          isTablet={isTablet}
          viewMode={viewMode}
          sortBy={sortBy}
          sortAscending={sortAscending}
          onSortColumn={onSortColumn}
          folders={[]}
          files={recentFiles}
          selectedFolderId={selectedFolderId}
          title="Recent files"
          emptyIcon="clock"
          emptyMsg="No recent files"
          emptyDesc="Files you upload will appear here."
          onSelectFolder={onSelectFolder}
          onOpenFolder={onOpenFolder}
          onOpenFile={onOpenPreview}
          onOpenContextMenu={onOpenContextMenu}
        />
      )}

      {section !== "drive" && section !== "trash" && section !== "recent" && (
        <FileBrowser
          section={section}
          viewMode={viewMode}
          sortBy={sortBy}
          sortAscending={sortAscending}
          isMobile={isMobile}
          isTablet={isTablet}
          starredFiles={starredFiles}
          onToggleStar={onToggleStar}
          onOpenPreview={onOpenPreview}
          onOpenContextMenu={onOpenContextMenu}
        />
      )}
    </main>
  )
}
