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
import {
  createFolderRequest,
  moveFolderRequest,
  permanentDeleteFolderRequest,
  renameFolderRequest,
  trashFolderRequest,
} from "@/lib/api/folders"
import { loadFolders, saveFolders } from "@/lib/folders/cache"
import { DRIVE_ROOT_ID, isFolderUuid } from "@/lib/folders/ids"
import { driveRootFolder, toQuickFolder } from "@/lib/folders/map"
import {
  activeChildren,
  collectTreeIds,
  folderBreadcrumbs,
  folderDestinations as buildFolderDestinations,
  markFolderTreeDeleted,
  moveDestinations as buildMoveDestinations,
  removeFolderTree,
  trashRoots,
  upsertFolder,
} from "@/lib/folders/tree"
import type { Folder, FolderBreadcrumb, FolderMoveDestination, QuickFolder } from "@/types"

interface FoldersContextValue {
  folders: Folder[]
  currentParentId: string | null
  currentFolders: QuickFolder[]
  trashFolders: QuickFolder[]
  trashCount: number
  breadcrumbs: FolderBreadcrumb[]
  selectedFolder: QuickFolder
  setSelectedFolder: (folder: QuickFolder) => void
  openFolder: (folder: QuickFolder) => void
  goToFolder: (id: string | null) => void
  createFolder: (name: string, color: string) => Promise<Folder>
  renameFolder: (id: string, name: string) => Promise<Folder>
  moveFolder: (id: string, parentId: string | null) => Promise<Folder>
  trashFolder: (id: string) => Promise<void>
  permanentDeleteFolder: (id: string) => Promise<void>
  emptyTrash: () => Promise<void>
  moveDestinations: (movingId: string) => FolderMoveDestination[]
  folderDestinations: FolderMoveDestination[]
  isTrashed: (id: string) => boolean
  ready: boolean
}

const FoldersContext = createContext<FoldersContextValue | null>(null)

function assertFolderId(id: string): void {
  if (!isFolderUuid(id)) {
    throw new Error("This folder is not synced with the File Storage API")
  }
}

export function FoldersProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const userId = user?.id ?? ""
  const [folders, setFolders] = useState<Folder[]>([])
  const [storeUserId, setStoreUserId] = useState<string | null>(null)
  const [currentParentId, setCurrentParentId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string>(DRIVE_ROOT_ID)

  useEffect(() => {
    if (!userId) return
    setFolders(loadFolders(userId))
    setCurrentParentId(null)
    setSelectedId(DRIVE_ROOT_ID)
    setStoreUserId(userId)
  }, [userId])

  useEffect(() => {
    if (!userId || storeUserId !== userId) return
    saveFolders(userId, folders)
  }, [userId, storeUserId, folders])

  const currentFolders = useMemo(
    () =>
      activeChildren(folders, currentParentId)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((folder) => toQuickFolder(folder, folders)),
    [folders, currentParentId],
  )

  const trashFolderRecords = useMemo(() => trashRoots(folders), [folders])

  const trashFolders = useMemo(
    () => trashFolderRecords.map((folder) => toQuickFolder(folder, folders)),
    [trashFolderRecords, folders],
  )

  const breadcrumbs = useMemo(() => folderBreadcrumbs(folders, currentParentId), [folders, currentParentId])

  const selectedFolder = useMemo(() => {
    if (selectedId === DRIVE_ROOT_ID) {
      return driveRootFolder(activeChildren(folders, null).length)
    }
    const found = folders.find((folder) => folder.id === selectedId)
    if (!found) return driveRootFolder(activeChildren(folders, null).length)
    return toQuickFolder(found, folders)
  }, [selectedId, folders])

  useEffect(() => {
    if (currentParentId) {
      const current = folders.find((folder) => folder.id === currentParentId)
      if (!current || current.deleted_at) {
        setCurrentParentId(null)
        setSelectedId(DRIVE_ROOT_ID)
      }
    }
  }, [folders, currentParentId])

  const setSelectedFolder = useCallback((folder: QuickFolder) => {
    setSelectedId(folder.id)
  }, [])

  const goToFolder = useCallback(
    (id: string | null) => {
      setCurrentParentId(id)
      setSelectedId(id ?? DRIVE_ROOT_ID)
    },
    [],
  )

  const openFolder = useCallback((folder: QuickFolder) => {
    if (folder.id === DRIVE_ROOT_ID) {
      setCurrentParentId(null)
      setSelectedId(DRIVE_ROOT_ID)
      return
    }
    setCurrentParentId(folder.id)
    setSelectedId(folder.id)
  }, [])

  const createFolder = useCallback(
    async (name: string, color: string) => {
      const folder = await createFolderRequest(name, currentParentId, color)
      setFolders((prev) => upsertFolder(prev, folder))
      setSelectedId(folder.id)
      return folder
    },
    [currentParentId],
  )

  const renameFolder = useCallback(async (id: string, name: string) => {
    assertFolderId(id)
    const folder = await renameFolderRequest(id, name)
    setFolders((prev) => upsertFolder(prev, folder))
    return folder
  }, [])

  const moveFolder = useCallback(async (id: string, parentId: string | null) => {
    assertFolderId(id)
    if (parentId !== null) assertFolderId(parentId)
    const folder = await moveFolderRequest(id, parentId)
    setFolders((prev) => upsertFolder(prev, folder))
    return folder
  }, [])

  const trashFolder = useCallback(async (id: string) => {
    assertFolderId(id)
    await trashFolderRequest(id)
    const deletedAt = new Date().toISOString()
    const treeIds = collectTreeIds(folders, id)
    setFolders((prev) => markFolderTreeDeleted(prev, id, deletedAt))
    setSelectedId((current) => (treeIds.includes(current) ? DRIVE_ROOT_ID : current))
  }, [folders])

  const permanentDeleteFolder = useCallback(async (id: string) => {
    assertFolderId(id)
    await permanentDeleteFolderRequest(id)
    const treeIds = collectTreeIds(folders, id)
    setFolders((prev) => removeFolderTree(prev, id))
    setSelectedId((current) => (treeIds.includes(current) ? DRIVE_ROOT_ID : current))
  }, [folders])

  const emptyTrash = useCallback(async () => {
    const roots = trashRoots(folders)
    for (const folder of roots) {
      await permanentDeleteFolderRequest(folder.id)
      setFolders((prev) => removeFolderTree(prev, folder.id))
    }
    setSelectedId(DRIVE_ROOT_ID)
  }, [folders])

  const destinations = useCallback(
    (movingId: string) => buildMoveDestinations(folders, movingId),
    [folders],
  )

  const allDestinations = useMemo(() => buildFolderDestinations(folders), [folders])

  const isTrashed = useCallback(
    (id: string) => Boolean(folders.find((folder) => folder.id === id)?.deleted_at),
    [folders],
  )

  const value = useMemo<FoldersContextValue>(
    () => ({
      folders,
      currentParentId,
      currentFolders,
      trashFolders,
      trashCount: trashFolderRecords.length,
      breadcrumbs,
      selectedFolder,
      setSelectedFolder,
      openFolder,
      goToFolder,
      createFolder,
      renameFolder,
      moveFolder,
      trashFolder,
      permanentDeleteFolder,
      emptyTrash,
      moveDestinations: destinations,
      folderDestinations: allDestinations,
      isTrashed,
      ready: storeUserId === userId && Boolean(userId),
    }),
    [
      folders,
      currentParentId,
      currentFolders,
      trashFolders,
      trashFolderRecords.length,
      breadcrumbs,
      selectedFolder,
      setSelectedFolder,
      openFolder,
      goToFolder,
      createFolder,
      renameFolder,
      moveFolder,
      trashFolder,
      permanentDeleteFolder,
      emptyTrash,
      destinations,
      allDestinations,
      isTrashed,
      storeUserId,
      userId,
    ],
  )

  return <FoldersContext.Provider value={value}>{children}</FoldersContext.Provider>
}

export function useFolders() {
  const ctx = useContext(FoldersContext)
  if (!ctx) throw new Error("useFolders must be used within FoldersProvider")
  return ctx
}
