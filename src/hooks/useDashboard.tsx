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
  ModalType,
  QuickFolder,
  RootFile,
  ViewMode,
} from "@/types"
import { getDefaultStarredIds, getQuickFolders } from "@/lib/data"

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
  renameTarget: { name: string } | null
  contextMenu: ContextMenu | null
  setContextMenu: (menu: ContextMenu | null) => void
  openShare: (item: { name: string }) => void
  openPreview: (item: FileItem | RootFile) => void
  openRename: (item: { name: string }) => void
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
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [starredFiles, setStarredFiles] = useState<Set<string>>(() => getDefaultStarredIds())
  const [selectedFolder, setSelectedFolder] = useState<QuickFolder>(() => getQuickFolders()[0])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true)
  const [sortBy, setSortByState] = useState("modified")
  const [sortAscending, setSortAscending] = useState(false)
  const [modal, setModal] = useState<ModalType>(null)
  const [shareTarget, setShareTarget] = useState<{ name: string } | null>(null)
  const [previewTarget, setPreviewTarget] = useState<FileItem | RootFile | null>(null)
  const [renameTarget, setRenameTarget] = useState<{ name: string } | null>(null)
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

  const openRename = useCallback((item: { name: string }) => {
    setRenameTarget(item)
    setModal("rename")
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
      contextMenu,
      setContextMenu,
      openShare,
      openPreview,
      openRename,
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
      sidebarOpen,
      rightOpen,
      rightSidebarVisible,
      modal,
      closeAll,
      shareTarget,
      previewTarget,
      renameTarget,
      contextMenu,
      openShare,
      openPreview,
      openRename,
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
