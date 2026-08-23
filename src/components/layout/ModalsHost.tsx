"use client"

import { useDashboard } from "@/hooks/useDashboard"
import { NewModal } from "@/components/modals/NewModal"
import { UploadModal } from "@/components/modals/UploadModal"
import { NewFolderModal } from "@/components/modals/NewFolderModal"
import { ProfileModal } from "@/components/modals/ProfileModal"
import { NotificationsPanel } from "@/components/modals/NotificationsPanel"
import { FilterPanel } from "@/components/modals/FilterPanel"
import { SortDropdown } from "@/components/modals/SortDropdown"
import { ShareModal } from "@/components/modals/ShareModal"
import { PreviewModal } from "@/components/modals/PreviewModal"
import { RenameModal } from "@/components/modals/RenameModal"
import { ContextMenuEl } from "@/components/files/ContextMenu"
import type { FileItem } from "@/types"

export function ModalsHost() {
  const {
    modal,
    setModal,
    closeAll,
    shareTarget,
    previewTarget,
    renameTarget,
    contextMenu,
    setContextMenu,
    sortBy,
    setSortBy,
    profileRef,
    bellRef,
    filterRef,
    sortRef,
    openShare,
    openPreview,
    openRename,
  } = useDashboard()

  return (
    <>
      {modal === "new" && (
        <NewModal
          onClose={closeAll}
          onNewFolder={() => setModal("newFolder")}
          onUpload={() => setModal("upload")}
        />
      )}
      {modal === "upload" && <UploadModal onClose={closeAll} />}
      {modal === "newFolder" && <NewFolderModal onClose={closeAll} />}
      {modal === "profile" && <ProfileModal onClose={closeAll} anchorRef={profileRef} />}
      {modal === "notifications" && <NotificationsPanel onClose={closeAll} anchorRef={bellRef} />}
      {modal === "filter" && <FilterPanel onClose={closeAll} anchorRef={filterRef} />}
      {modal === "sort" && (
        <SortDropdown onClose={closeAll} anchorRef={sortRef} current={sortBy} onChange={setSortBy} />
      )}
      {modal === "share" && shareTarget && <ShareModal item={shareTarget} onClose={closeAll} />}
      {modal === "preview" && previewTarget && (
        <PreviewModal
          item={previewTarget}
          onClose={closeAll}
          onShare={() => openShare({ name: previewTarget.name })}
        />
      )}
      {modal === "rename" && renameTarget && <RenameModal item={renameTarget} onClose={closeAll} />}
      {contextMenu && (
        <ContextMenuEl
          ctx={contextMenu}
          onClose={() => setContextMenu(null)}
          onShare={() => openShare({ name: contextMenu.item?.name ?? "" })}
          onPreview={() => contextMenu.type === "file" && openPreview(contextMenu.item as FileItem)}
          onRename={() => openRename({ name: contextMenu.item?.name ?? "" })}
        />
      )}
    </>
  )
}
