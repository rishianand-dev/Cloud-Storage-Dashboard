"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react"
import type {
  ContextMenu,
  FileItem,
  ItemTarget,
  ModalType,
  QuickFolder,
  RenameTarget,
  RootFile,
  ViewMode,
} from "@/types"
import { getDefaultStarredIds } from "@/lib/data"
import { useFolders } from "@/hooks/useFolders"

interface DashboardContextValue {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  sortBy: string
  setSortBy: (value: string) => void
  sortAscending: boolean
  toggleSortColumn: (column: string) => void
  starredFiles: Set<string>
  toggleStar: (id: string) => void
  selectedFolder: QuickFolder
  setSelectedFolder: (folder: QuickFolder) => void
  openFolder: (folder: QuickFolder) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  rightOpen: boolean
  setRightOpen: (open: boolean) => void
  rightSidebarVisible: boolean
  setRightSidebarVisible: (visible: boolean) => void
  modal: ModalType
  setModal: (modal: ModalType) => void
  closeAll: () => void
  shareTarget: { name: string } | null
  previewTarget: FileItem | RootFile | null
  renameTarget: RenameTarget | null
  moveTarget: ItemTarget | null
  trashTarget: ItemTarget | null
  permanentTarget: ItemTarget | null
  restoreTarget: ItemTarget | null
  contextMenu: ContextMenu | null
  setContextMenu: (menu: ContextMenu | null) => void
  openShare: (item: { name: string }) => void
  openPreview: (item: FileItem | RootFile) => void
  openRename: (item: RenameTarget) => void
  openMove: (item: ItemTarget) => void
  openTrash: (item: ItemTarget) => void
  openPermanent: (item: ItemTarget) => void
  openRestore: (item: ItemTarget) => void
  openEmptyTrash: () => void
  openContextMenu: (
    e: React.MouseEvent,
    type: "file" | "folder",
    item: FileItem | QuickFolder | RootFile,
  ) => void
  profileRef: RefObject<HTMLDivElement | null>
  bellRef: RefObject<HTMLDivElement | null>
  filterRef: RefObject<HTMLButtonElement | null>
  sortRef: RefObject<HTMLButtonElement | null>
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { selectedFolder, setSelectedFolder, openFolder } = useFolders()
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [starredFiles, setStarredFiles] = useState<Set<string>>(() => getDefaultStarredIds())
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true)
  const [sortBy, setSortByState] = useState("modified")
  const [sortAscending, setSortAscending] = useState(false)
  const [modal, setModal] = useState<ModalType>(null)
  const [shareTarget, setShareTarget] = useState<{ name: string } | null>(null)
  const [previewTarget, setPreviewTarget] = useState<FileItem | RootFile | null>(null)
  const [renameTarget, setRenameTarget] = useState<RenameTarget | null>(null)
  const [moveTarget, setMoveTarget] = useState<ItemTarget | null>(null)
  const [trashTarget, setTrashTarget] = useState<ItemTarget | null>(null)
  const [permanentTarget, setPermanentTarget] = useState<ItemTarget | null>(null)
  const [restoreTarget, setRestoreTarget] = useState<ItemTarget | null>(null)
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null)

  const profileRef = useRef<HTMLDivElement>(null)
  const bellRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLButtonElement>(null)
  const sortRef = useRef<HTMLButtonElement>(null)

  const closeAll = useCallback(() => {
    setModal(null)
    setContextMenu(null)
  }, [])

  const toggleStar = useCallback((id: string) => {
    setStarredFiles((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const setSortBy = useCallback((value: string) => {
    setSortByState(value)
    setSortAscending(value === "name" || value === "owner" || value === "type")
  }, [])

  const toggleSortColumn = useCallback(
    (column: string) => {
      if (sortBy === column) {
        setSortAscending((asc) => !asc)
        return
      }
      setSortByState(column)
      setSortAscending(column === "name" || column === "owner" || column === "type")
    },
    [sortBy],
  )

  const openShare = useCallback((item: { name: string }) => {
    setShareTarget(item)
    setModal("share")
    setContextMenu(null)
  }, [])

  const openPreview = useCallback((item: FileItem | RootFile) => {
    setPreviewTarget(item)
    setModal("preview")
    setContextMenu(null)
  }, [])

  const openRename = useCallback((item: RenameTarget) => {
    setRenameTarget(item)
    setModal("rename")
    setContextMenu(null)
  }, [])

  const openMove = useCallback((item: ItemTarget) => {
    setMoveTarget(item)
    setModal("moveFolder")
    setContextMenu(null)
  }, [])

  const openTrash = useCallback((item: ItemTarget) => {
    setTrashTarget(item)
    setModal("confirmTrash")
    setContextMenu(null)
  }, [])

  const openPermanent = useCallback((item: ItemTarget) => {
    setPermanentTarget(item)
    setModal("confirmPermanent")
    setContextMenu(null)
  }, [])

  const openRestore = useCallback((item: ItemTarget) => {
    setRestoreTarget(item)
    setModal("confirmRestore")
    setContextMenu(null)
  }, [])

  const openEmptyTrash = useCallback(() => {
    setModal("confirmEmptyTrash")
    setContextMenu(null)
  }, [])

  const openContextMenu = useCallback(
    (e: React.MouseEvent, type: "file" | "folder", item: FileItem | QuickFolder | RootFile) => {
      e.preventDefault()
      e.stopPropagation()
      setContextMenu({ x: e.clientX, y: e.clientY, type, item })
    },
    [],
  )

  useEffect(() => {
    const handler = () => setContextMenu(null)
    window.addEventListener("scroll", handler, true)
    return () => window.removeEventListener("scroll", handler, true)
  }, [])

  const value = useMemo<DashboardContextValue>(
    () => ({
      viewMode,
      setViewMode,
      sortBy,
      setSortBy,
      sortAscending,
      toggleSortColumn,
      starredFiles,
      toggleStar,
      selectedFolder,
      setSelectedFolder,
      openFolder,
      sidebarOpen,
      setSidebarOpen,
      rightOpen,
      setRightOpen,
      rightSidebarVisible,
      setRightSidebarVisible,
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
      openShare,
      openPreview,
      openRename,
      openMove,
      openTrash,
      openPermanent,
      openRestore,
      openEmptyTrash,
      openContextMenu,
      profileRef,
      bellRef,
      filterRef,
      sortRef,
    }),
    [
      viewMode,
      sortBy,
      setSortBy,
      sortAscending,
      toggleSortColumn,
      starredFiles,
      toggleStar,
      selectedFolder,
      setSelectedFolder,
      openFolder,
      sidebarOpen,
      rightOpen,
      rightSidebarVisible,
      modal,
      closeAll,
      shareTarget,
      previewTarget,
      renameTarget,
      moveTarget,
      trashTarget,
      permanentTarget,
      restoreTarget,
      contextMenu,
      openShare,
      openPreview,
      openRename,
      openMove,
      openTrash,
      openPermanent,
      openRestore,
      openEmptyTrash,
      openContextMenu,
    ],
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider")
  return ctx
}
