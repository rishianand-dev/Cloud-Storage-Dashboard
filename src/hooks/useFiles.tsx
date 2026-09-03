"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { useAuth } from "@/hooks/useAuth"
import { useFolders } from "@/hooks/useFolders"
import {
  moveFileRequest,
  permanentDeleteFileRequest,
  renameFileRequest,
  restoreFileRequest,
  trashFileRequest,
  uploadFileRequest,
} from "@/lib/api/files"
import { loadFiles, saveFiles } from "@/lib/files/cache"
import {
  MAX_FILE_BYTES,
  activeFilesInFolder,
  syncFilesWithFolders,
  toFileItem,
  trashVisibleFiles,
  upsertFile,
} from "@/lib/files/map"
import { isUuid } from "@/lib/folders/ids"
import type { FileItem, FileRecord } from "@/types"

interface FilesContextValue {
  files: FileRecord[]
  currentFiles: FileItem[]
  trashFiles: FileItem[]
  recentFiles: FileItem[]
  trashCount: number
  uploadFiles: (fileList: File[]) => Promise<void>
  renameFile: (id: string, name: string) => Promise<FileRecord>
  moveFile: (id: string, folderId: string | null) => Promise<FileRecord>
  trashFile: (id: string) => Promise<void>
  restoreFile: (id: string) => Promise<void>
  permanentDeleteFile: (id: string) => Promise<void>
  emptyTrash: () => Promise<void>
  isTrashed: (id: string) => boolean
}

const FilesContext = createContext<FilesContextValue | null>(null)

function assertFileId(id: string): void {
  if (!isUuid(id)) {
    throw new Error("This file is not synced with the File Storage API")
  }
}

export function FilesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { folders, currentParentId, ready: foldersReady } = useFolders()
  const userId = user?.id ?? ""
  const [files, setFiles] = useState<FileRecord[]>([])
  const [storeUserId, setStoreUserId] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    setFiles(loadFiles(userId))
    setStoreUserId(userId)
  }, [userId])

  useEffect(() => {
    if (!userId || storeUserId !== userId) return
    saveFiles(userId, files)
  }, [userId, storeUserId, files])

  useEffect(() => {
    if (!foldersReady || storeUserId !== userId) return
    setFiles((prev) => {
      const next = syncFilesWithFolders(prev, folders)
      if (next.length === prev.length && next.every((file, index) => file === prev[index])) return prev
      return next
    })
  }, [folders, foldersReady, storeUserId, userId])

  const currentRecords = useMemo(
    () =>
      activeFilesInFolder(files, currentParentId).sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [files, currentParentId],
  )

  const currentFiles = useMemo(() => currentRecords.map(toFileItem), [currentRecords])

  const trashRecords = useMemo(() => trashVisibleFiles(files, folders), [files, folders])

  const trashFiles = useMemo(() => trashRecords.map(toFileItem), [trashRecords])

  const recentFiles = useMemo(
    () =>
      files
        .filter((file) => !file.deleted_at)
        .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
        .slice(0, 40)
        .map(toFileItem),
    [files],
  )

  const uploadFiles = useCallback(
    async (fileList: File[]) => {
      for (const file of fileList) {
        if (file.size > MAX_FILE_BYTES) {
          throw new Error(`${file.name} exceeds the 50 MB upload limit`)
        }
        const record = await uploadFileRequest(file, currentParentId)
        setFiles((prev) => upsertFile(prev, record))
      }
    },
    [currentParentId],
  )

  const renameFile = useCallback(async (id: string, name: string) => {
    assertFileId(id)
    const record = await renameFileRequest(id, name)
    setFiles((prev) => upsertFile(prev, record))
    return record
  }, [])

  const moveFile = useCallback(async (id: string, folderId: string | null) => {
    assertFileId(id)
    if (folderId !== null) assertFileId(folderId)
    const record = await moveFileRequest(id, folderId)
    setFiles((prev) => upsertFile(prev, record))
    return record
  }, [])

  const trashFile = useCallback(async (id: string) => {
    assertFileId(id)
    const record = await trashFileRequest(id)
    setFiles((prev) => upsertFile(prev, record))
  }, [])

  const restoreFile = useCallback(async (id: string) => {
    assertFileId(id)
    const record = await restoreFileRequest(id)
    setFiles((prev) => upsertFile(prev, record))
  }, [])

  const permanentDeleteFile = useCallback(async (id: string) => {
    assertFileId(id)
    await permanentDeleteFileRequest(id)
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }, [])

  const emptyTrash = useCallback(async () => {
    const trashed = files.filter((file) => file.deleted_at)
    for (const file of trashed) {
      try {
        await permanentDeleteFileRequest(file.id)
      } catch {
        // Folder permanent delete may already have removed nested files.
      }
      setFiles((prev) => prev.filter((item) => item.id !== file.id))
    }
  }, [files])

  const isTrashed = useCallback(
    (id: string) => Boolean(files.find((file) => file.id === id)?.deleted_at),
    [files],
  )

  const value = useMemo<FilesContextValue>(
    () => ({
      files,
      currentFiles,
      trashFiles,
      recentFiles,
      trashCount: trashRecords.length,
      uploadFiles,
      renameFile,
      moveFile,
      trashFile,
      restoreFile,
      permanentDeleteFile,
      emptyTrash,
      isTrashed,
    }),
    [
      files,
      currentFiles,
      trashFiles,
      recentFiles,
      trashRecords.length,
      uploadFiles,
      renameFile,
      moveFile,
      trashFile,
      restoreFile,
      permanentDeleteFile,
      emptyTrash,
      isTrashed,
    ],
  )

  return <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
}

export function useFiles() {
  const ctx = useContext(FilesContext)
  if (!ctx) throw new Error("useFiles must be used within FilesProvider")
  return ctx
}
