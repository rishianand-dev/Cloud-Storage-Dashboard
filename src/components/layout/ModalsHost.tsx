"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/hooks/useDashboard"
import { useFolders } from "@/hooks/useFolders"
import { useFiles } from "@/hooks/useFiles"
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
import { MoveFolderModal } from "@/components/modals/MoveFolderModal"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { ContextMenuEl } from "@/components/files/ContextMenu"
import { downloadFileToDevice, fieldErrorsFromApi } from "@/lib/api"
import type { FileItem, QuickFolder } from "@/types"

export function ModalsHost() {
  const {
    modal,
    setModal,
    closeAll,
    shareTarget,
    previewTarget,
    renameTarget,
    moveTarget,
    trashTarget,
    permanentTarget,
    restoreTarget,
    contextMenu,
    setContextMenu,
    sortBy,
    setSortBy,
    profileRef,
    bellRef,
    filterRef,
    sortRef,
    openPreview,
    openRename,
    openMove,
    openTrash,
    openPermanent,
    openRestore,
    openFolder,
  } = useDashboard()
  const {
    trashFolder,
    permanentDeleteFolder,
    emptyTrash: emptyFolderTrash,
    isTrashed: isFolderTrashed,
  } = useFolders()
  const {
    trashFile,
    restoreFile,
    permanentDeleteFile,
    emptyTrash: emptyFileTrash,
    isTrashed: isFileTrashed,
  } = useFiles()
  const [confirmError, setConfirmError] = useState<{
    form: string
    details?: { path: string; message: string }[]
  } | null>(null)
  const [confirmPending, setConfirmPending] = useState(false)

  useEffect(() => {
    setConfirmError(null)
    setConfirmPending(false)
  }, [modal])

  function resetConfirm() {
    setConfirmError(null)
    setConfirmPending(false)
    closeAll()
  }

  async function runConfirm(action: () => Promise<void>) {
    setConfirmPending(true)
    setConfirmError(null)
    try {
      await action()
      resetConfirm()
    } catch (error) {
      setConfirmError(fieldErrorsFromApi(error))
      setConfirmPending(false)
    }
  }

  const contextFolder = contextMenu?.type === "folder" ? (contextMenu.item as QuickFolder) : null
  const contextFile = contextMenu?.type === "file" ? (contextMenu.item as FileItem) : null
  const contextTrashed = contextFolder
    ? isFolderTrashed(contextFolder.id)
    : contextFile
      ? isFileTrashed(contextFile.id)
      : false

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
      {modal === "preview" && previewTarget && <PreviewModal item={previewTarget} onClose={closeAll} />}
      {modal === "rename" && renameTarget && <RenameModal item={renameTarget} onClose={closeAll} />}
      {modal === "moveFolder" && moveTarget && <MoveFolderModal item={moveTarget} onClose={closeAll} />}
      {modal === "confirmTrash" && trashTarget && (
        <ConfirmModal
          title="Move to Trash"
          message={
            trashTarget.kind === "folder"
              ? `Move "${trashTarget.name}" to Trash? Nested folders and files will be trashed too.`
              : `Move "${trashTarget.name}" to Trash?`
          }
          confirmLabel="Move to Trash"
          pendingLabel="Trashing…"
          pending={confirmPending}
          error={confirmError?.form}
          details={confirmError?.details}
          onConfirm={() =>
            runConfirm(() =>
              trashTarget.kind === "folder" ? trashFolder(trashTarget.id) : trashFile(trashTarget.id),
            )
          }
          onClose={resetConfirm}
        />
      )}
      {modal === "confirmPermanent" && permanentTarget && (
        <ConfirmModal
          title="Delete forever"
          message={`Permanently delete "${permanentTarget.name}"? This cannot be undone.`}
          confirmLabel="Delete forever"
          pendingLabel="Deleting…"
          pending={confirmPending}
          error={confirmError?.form}
          details={confirmError?.details}
          onConfirm={() =>
            runConfirm(() =>
              permanentTarget.kind === "folder"
                ? permanentDeleteFolder(permanentTarget.id)
                : permanentDeleteFile(permanentTarget.id),
            )
          }
          onClose={resetConfirm}
        />
      )}
      {modal === "confirmEmptyTrash" && (
        <ConfirmModal
          title="Empty Trash"
          message="Permanently delete all files and folders in Trash? This cannot be undone."
          confirmLabel="Empty Trash"
          pendingLabel="Deleting…"
          pending={confirmPending}
          error={confirmError?.form}
          details={confirmError?.details}
          onConfirm={() =>
            runConfirm(async () => {
              await emptyFileTrash()
              await emptyFolderTrash()
            })
          }
          onClose={resetConfirm}
        />
      )}
      {modal === "confirmRestore" && restoreTarget && (
        <ConfirmModal
          title="Restore file"
          message={`Restore "${restoreTarget.name}" from Trash?`}
          confirmLabel="Restore"
          pendingLabel="Restoring…"
          pending={confirmPending}
          error={confirmError?.form}
          details={confirmError?.details}
          onConfirm={() => runConfirm(() => restoreFile(restoreTarget.id))}
          onClose={resetConfirm}
          danger={false}
        />
      )}
      {contextMenu && (
        <ContextMenuEl
          ctx={contextMenu}
          onClose={() => setContextMenu(null)}
          onPreview={() => contextMenu.type === "file" && openPreview(contextMenu.item as FileItem)}
          onRename={() => {
            if (!contextMenu.item) return
            const file = contextMenu.type === "file" ? (contextMenu.item as FileItem) : null
            openRename({
              id: contextMenu.item.id,
              name: file?.ext ? `${file.name}.${file.ext}` : contextMenu.item.name,
              kind: contextMenu.type,
            })
          }}
          onOpenFolder={() => contextFolder && openFolder(contextFolder)}
          onMove={() => {
            if (contextFolder) openMove({ kind: "folder", id: contextFolder.id, name: contextFolder.name })
            if (contextFile) {
              openMove({
                kind: "file",
                id: contextFile.id,
                name: contextFile.ext ? `${contextFile.name}.${contextFile.ext}` : contextFile.name,
              })
            }
          }}
          onTrash={() => {
            if (contextFolder) openTrash({ kind: "folder", id: contextFolder.id, name: contextFolder.name })
            if (contextFile) {
              openTrash({
                kind: "file",
                id: contextFile.id,
                name: contextFile.ext ? `${contextFile.name}.${contextFile.ext}` : contextFile.name,
              })
            }
          }}
          onPermanentDelete={() => {
            if (contextFolder) openPermanent({ kind: "folder", id: contextFolder.id, name: contextFolder.name })
            if (contextFile) {
              openPermanent({
                kind: "file",
                id: contextFile.id,
                name: contextFile.ext ? `${contextFile.name}.${contextFile.ext}` : contextFile.name,
              })
            }
          }}
          onRestore={() =>
            contextFile &&
            openRestore({
              kind: "file",
              id: contextFile.id,
              name: contextFile.ext ? `${contextFile.name}.${contextFile.ext}` : contextFile.name,
            })
          }
          onDownload={() => {
            if (!contextFile) return
            const filename = contextFile.ext ? `${contextFile.name}.${contextFile.ext}` : contextFile.name
            void downloadFileToDevice(contextFile.id, filename)
          }}
          trashed={contextTrashed}
        />
      )}
    </>
  )
}
