"use client"

import { useMemo } from "react"
import type { FileItem, QuickFolder, RootFile, ViewMode } from "@/types"
import { Avatar } from "@/components/ui/Avatar"
import { FileTypeIcon } from "@/components/ui/FileTypeIcon"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"
import { getQuickFolders, getRootFiles } from "@/lib/data"
import { useAuth } from "@/hooks/useAuth"
import { compareSortValues, modifiedRank, sizeToBytes } from "@/lib/sort"

type DriveRow =
  | { kind: "folder"; item: QuickFolder }
  | { kind: "file"; item: RootFile }

function ListHeader({
  isMobile,
  sortBy,
  sortAscending,
  onSortColumn,
}: {
  isMobile: boolean
  sortBy: string
  sortAscending: boolean
  onSortColumn: (column: string) => void
}) {
  const headerStyle = {
    fontSize: 11.5,
    fontWeight: 700,
    color: "#8B90A7",
    letterSpacing: "0.4px",
    textTransform: "uppercase" as const,
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontFamily: "inherit",
  }

  const SortLabel = ({ column, label, align }: { column: string; label: string; align?: "right" }) => {
    const active = sortBy === column
    return (
      <button
        type="button"
        onClick={() => onSortColumn(column)}
        aria-label={`Sort by ${label}`}
        style={{
          ...headerStyle,
          color: active ? "#5B7CFA" : "#8B90A7",
          justifyContent: align === "right" ? "flex-end" : "flex-start",
          width: align === "right" ? "100%" : undefined,
          textAlign: align === "right" ? "right" : "left",
        }}
      >
        {label}
        {active && (
          <span
            style={{
              display: "inline-flex",
              transform: sortAscending ? "rotate(180deg)" : "none",
              transition: "transform 0.15s ease",
            }}
          >
            <Icon d={ic.chevDown} size={12} color="#5B7CFA" />
          </span>
        )}
      </button>
    )
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "minmax(0,1fr) 40px" : "minmax(0,1.6fr) 140px 150px 90px 40px",
        gap: 12,
        alignItems: "center",
        padding: isMobile ? "10px 14px" : "10px 20px",
        borderBottom: "1px solid rgba(163,177,198,0.18)",
      }}
    >
      <SortLabel column="name" label="Name" />
      {!isMobile && (
        <>
          <SortLabel column="owner" label="Owner" />
          <SortLabel column="modified" label="Modified" />
          <SortLabel column="size" label="Size" align="right" />
        </>
      )}
      <div />
    </div>
  )
}

function FolderRow({
  folder,
  selected,
  isMobile,
  onSelect,
  onOpenContextMenu,
}: {
  folder: QuickFolder
  selected: boolean
  isMobile: boolean
  onSelect: () => void
  onOpenContextMenu: (e: React.MouseEvent) => void
}) {
  const { account: user } = useAuth()

  return (
    <div
      onClick={onSelect}
      onContextMenu={onOpenContextMenu}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "minmax(0,1fr) 40px" : "minmax(0,1.6fr) 140px 150px 90px 40px",
        gap: 12,
        alignItems: "center",
        padding: isMobile ? "12px 14px" : "13px 20px",
        cursor: "pointer",
        background: selected ? `${folder.color}0D` : "transparent",
        boxShadow: selected ? `inset 3px 0 0 ${folder.color}` : "none",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => {
        if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.55)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = selected ? `${folder.color}0D` : "transparent"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 11,
            background: folder.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: `3px 3px 8px ${folder.color}18, -2px -2px 5px rgba(255,255,255,0.8)`,
          }}
        >
          <Icon d={ic.folder} size={18} color={folder.color} strokeWidth={1.8} />
        </div>
        <div style={{ minWidth: 0 }}>
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
            {folder.name}
          </div>
          {isMobile && (
            <div style={{ fontSize: 11.5, color: "#8B90A7", marginTop: 2 }}>
              {folder.count} files · {folder.modified}
            </div>
          )}
        </div>
      </div>

      {!isMobile && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar initials={user.initials} color="#5B7CFA" size={24} />
            <span style={{ fontSize: 13, color: "#5A5F7A", fontWeight: 500 }}>me</span>
          </div>
          <div style={{ fontSize: 13, color: "#5A5F7A" }}>{folder.modified}</div>
          <div style={{ fontSize: 13, color: "#8B90A7", textAlign: "right" }}>{folder.count} items</div>
        </>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onOpenContextMenu(e)
        }}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 6,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifySelf: "end",
        }}
      >
        <Icon d={ic.moreV} size={15} color="#C4C9DC" strokeWidth={2.5} />
      </button>
    </div>
  )
}

function FileRow({
  file,
  isMobile,
  isLast,
  onOpen,
  onOpenContextMenu,
}: {
  file: RootFile
  isMobile: boolean
  isLast: boolean
  onOpen: () => void
  onOpenContextMenu: (e: React.MouseEvent) => void
}) {
  const { account: user } = useAuth()

  return (
    <div
      onClick={onOpen}
      onContextMenu={onOpenContextMenu}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "minmax(0,1fr) 40px" : "minmax(0,1.6fr) 140px 150px 90px 40px",
        gap: 12,
        alignItems: "center",
        padding: isMobile ? "12px 14px" : "13px 20px",
        cursor: "pointer",
        borderBottom: isLast ? "none" : "1px solid rgba(163,177,198,0.12)",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.55)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 11,
            background: file.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: `3px 3px 8px ${file.iconColor}18, -2px -2px 5px rgba(255,255,255,0.8)`,
          }}
        >
          <Icon d={ic[file.icon] || ic.doc} size={16} color={file.iconColor} strokeWidth={1.8} />
        </div>
        <div style={{ minWidth: 0 }}>
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
            {file.name}
            <span style={{ color: "#8B90A7", fontWeight: 600 }}>.{file.ext}</span>
          </div>
          {isMobile && (
            <div style={{ fontSize: 11.5, color: "#8B90A7", marginTop: 2 }}>
              {file.size} · {file.modified}
            </div>
          )}
        </div>
      </div>

      {!isMobile && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar initials={user.initials} color="#5B7CFA" size={24} />
            <span style={{ fontSize: 13, color: "#5A5F7A", fontWeight: 500 }}>me</span>
          </div>
          <div style={{ fontSize: 13, color: "#5A5F7A" }}>{file.modified}</div>
          <div style={{ fontSize: 13, color: "#8B90A7", textAlign: "right" }}>{file.size}</div>
        </>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onOpenContextMenu(e)
        }}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 6,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifySelf: "end",
        }}
      >
        <Icon d={ic.moreV} size={15} color="#C4C9DC" strokeWidth={2.5} />
      </button>
    </div>
  )
}

function FolderCard({
  folder,
  selected,
  onSelect,
  onOpenContextMenu,
}: {
  folder: QuickFolder
  selected: boolean
  onSelect: () => void
  onOpenContextMenu: (e: React.MouseEvent) => void
}) {
  return (
    <div
      className="quick-card"
      onContextMenu={onOpenContextMenu}
      onClick={onSelect}
      style={{
        borderRadius: 22,
        padding: "18px 16px",
        cursor: "pointer",
        background: "#F4F6FA",
        position: "relative",
        overflow: "hidden",
        outline: selected ? `2px solid ${folder.color}44` : "2px solid transparent",
        boxShadow: "10px 10px 24px rgba(163,177,198,0.5), -6px -6px 18px rgba(255,255,255,0.9)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -16,
          right: -16,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: folder.bg,
          opacity: 0.8,
        }}
      />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 13,
            background: folder.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `4px 4px 10px ${folder.color}22, -2px -2px 6px rgba(255,255,255,0.8)`,
          }}
        >
          <Icon d={ic.folder} size={20} color={folder.color} strokeWidth={1.8} />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpenContextMenu(e)
          }}
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, zIndex: 1 }}
        >
          <Icon d={ic.moreV} size={15} color="#C4C9DC" strokeWidth={2.5} />
        </button>
      </div>
      <div style={{ fontSize: 14.5, fontWeight: 700, color: "#1A1D2E", marginBottom: 2, letterSpacing: "-0.2px" }}>
        {folder.name}
      </div>
      <div style={{ fontSize: 11.5, color: "#8B90A7", marginBottom: 12 }}>
        {folder.count} files · {folder.modified}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {folder.files.map((f, fi) => (
          <div
            key={fi}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 8px",
              borderRadius: 9,
              background: "rgba(255,255,255,0.6)",
              boxShadow: "2px 2px 5px rgba(163,177,198,0.2), -1px -1px 3px rgba(255,255,255,0.8)",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.6)")}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                background: `${f.iconColor}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon d={ic[f.icon] || ic.doc} size={11} color={f.iconColor} strokeWidth={2} />
            </div>
            <div
              style={{
                flex: 1,
                minWidth: 0,
                fontSize: 11,
                fontWeight: 600,
                color: "#1A1D2E",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {f.name}
            </div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                background: `${folder.color}15`,
                color: folder.color,
                padding: "1px 5px",
                borderRadius: 4,
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              {f.ext}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 10,
          height: 2.5,
          borderRadius: 3,
          background: `linear-gradient(90deg, ${folder.color}77, ${folder.color}18)`,
        }}
      />
    </div>
  )
}

function FileCard({
  file,
  onOpen,
  onOpenContextMenu,
}: {
  file: RootFile
  onOpen: () => void
  onOpenContextMenu: (e: React.MouseEvent) => void
}) {
  return (
    <div
      className="file-card"
      onContextMenu={onOpenContextMenu}
      onClick={onOpen}
      style={{
        borderRadius: 18,
        padding: "14px 14px",
        background: "#F4F6FA",
        cursor: "pointer",
        boxShadow: "8px 8px 20px rgba(163,177,198,0.45), -6px -6px 16px rgba(255,255,255,0.88)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <FileTypeIcon
          icon={file.icon}
          iconBg={file.iconBg}
          iconColor={file.iconColor}
          ext={file.ext}
          size={44}
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpenContextMenu(e)
          }}
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: 3 }}
        >
          <Icon d={ic.moreV} size={14} color="#C4C9DC" strokeWidth={2.5} />
        </button>
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#1A1D2E",
          marginBottom: 2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {file.name}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 11, color: "#C4C9DC" }}>{file.size}</span>
        <span style={{ fontSize: 11, color: "#C4C9DC" }}>{file.modified}</span>
      </div>
    </div>
  )
}

export function QuickAccess({
  isMobile,
  isTablet,
  viewMode,
  sortBy,
  sortAscending,
  onSortColumn,
  selectedFolderId,
  onSelectFolder,
  onOpenPreview,
  onOpenContextMenu,
}: {
  isMobile: boolean
  isTablet: boolean
  viewMode: ViewMode
  sortBy: string
  sortAscending: boolean
  onSortColumn: (column: string) => void
  selectedFolderId: string
  onSelectFolder: (folder: QuickFolder) => void
  onOpenPreview: (file: RootFile) => void
  onOpenContextMenu: (
    e: React.MouseEvent,
    type: "file" | "folder",
    item: FileItem | QuickFolder | RootFile,
  ) => void
}) {
  const quickFolders = getQuickFolders()
  const rootFiles = getRootFiles()

  const rows = useMemo(() => {
    const combined: DriveRow[] = [
      ...quickFolders.map((item) => ({ kind: "folder" as const, item })),
      ...rootFiles.map((item) => ({ kind: "file" as const, item })),
    ]

    const valueFor = (row: DriveRow): string | number => {
      switch (sortBy) {
        case "name":
          return row.item.name
        case "owner":
          return "me"
        case "size":
          return row.kind === "folder" ? row.item.count : sizeToBytes(row.item.size)
        case "type":
          return row.kind === "folder" ? "folder" : row.item.ext
        case "modified":
        default:
          return modifiedRank(row.item.modified)
      }
    }

    return [...combined].sort((a, b) => compareSortValues(valueFor(a), valueFor(b), sortAscending))
  }, [quickFolders, rootFiles, sortBy, sortAscending])

  return (
    <section style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 19, fontWeight: 700, color: "#1A1D2E", marginBottom: 18, letterSpacing: "-0.2px" }}>
        Quick Access
      </div>

      {viewMode === "list" ? (
        <div className="neu-card" style={{ borderRadius: 22, background: "#F4F6FA", overflow: "hidden" }}>
          <ListHeader
            isMobile={isMobile}
            sortBy={sortBy}
            sortAscending={sortAscending}
            onSortColumn={onSortColumn}
          />
          {rows.map((row, index) =>
            row.kind === "folder" ? (
              <div
                key={row.item.id}
                style={{
                  borderBottom: index < rows.length - 1 ? "1px solid rgba(163,177,198,0.12)" : "none",
                }}
              >
                <FolderRow
                  folder={row.item}
                  selected={selectedFolderId === row.item.id}
                  isMobile={isMobile}
                  onSelect={() => onSelectFolder(row.item)}
                  onOpenContextMenu={(e) => onOpenContextMenu(e, "folder", row.item)}
                />
              </div>
            ) : (
              <FileRow
                key={row.item.id}
                file={row.item}
                isMobile={isMobile}
                isLast={index === rows.length - 1}
                onOpen={() => onOpenPreview(row.item)}
                onOpenContextMenu={(e) => onOpenContextMenu(e, "file", row.item)}
              />
            ),
          )}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2,1fr)"
              : isTablet
                ? "repeat(2,1fr)"
                : "repeat(4,1fr)",
            gap: isMobile ? 12 : 18,
          }}
        >
          {rows.map((row) =>
            row.kind === "folder" ? (
              <FolderCard
                key={row.item.id}
                folder={row.item}
                selected={selectedFolderId === row.item.id}
                onSelect={() => onSelectFolder(row.item)}
                onOpenContextMenu={(e) => onOpenContextMenu(e, "folder", row.item)}
              />
            ) : (
              <FileCard
                key={row.item.id}
                file={row.item}
                onOpen={() => onOpenPreview(row.item)}
                onOpenContextMenu={(e) => onOpenContextMenu(e, "file", row.item)}
              />
            ),
          )}
        </div>
      )}
    </section>
  )
}
