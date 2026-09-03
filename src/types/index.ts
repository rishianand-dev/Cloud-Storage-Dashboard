export type NavId = "drive" | "recent" | "favorites" | "shared" | "trash" | "archive" | "offline"

export type ViewMode = "grid" | "list"

export type ModalType =
  | "new"
  | "upload"
  | "newFolder"
  | "profile"
  | "share"
  | "filter"
  | "sort"
  | "notifications"
  | "preview"
  | "rename"
  | "moveFolder"
  | "confirmTrash"
  | "confirmPermanent"
  | "confirmEmptyTrash"
  | "confirmRestore"
  | null

export interface FileItem {
  id: string
  name: string
  ext: string
  icon: string
  iconBg: string
  iconColor: string
  owner: string
  size: string
  modified: string
  starred: boolean
  section: NavId[]
}

export interface QuickFile {
  name: string
  ext: string
  size: string
  icon: string
  iconColor: string
}

export interface QuickFolder {
  id: string
  name: string
  count: number
  modified: string
  color: string
  bg: string
  files: QuickFile[]
}

export interface RootFile {
  id: string
  name: string
  ext: string
  icon: string
  iconBg: string
  iconColor: string
  size: string
  modified: string
}

/** Shared shape for list/card rendering across FileItem and RootFile. */
export interface FileLike {
  id: string
  name: string
  ext: string
  icon: string
  iconBg: string
  iconColor: string
  size: string
  modified: string
}

export interface ContextMenu {
  x: number
  y: number
  type: "file" | "folder"
  item: FileItem | QuickFolder | RootFile | null
}

export type Folder = {
  id: string
  name: string
  color: string | null
  parent_id: string | null
  owner_id: string
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export type SoftDeleteFolderResult = {
  id: string
  deleted_folders: number
}

export type PermanentDeleteFolderResult = {
  id: string
  deleted_folders: number
  deleted_files: number
}

export type RenameTarget = {
  id: string
  name: string
  kind: "file" | "folder"
}

export type FolderBreadcrumb = {
  id: string | null
  name: string
}

export type FolderMoveDestination = {
  id: string | null
  name: string
  depth: number
}

export type FileRecord = {
  id: string
  name: string
  extension: string
  mime_type: string
  storage_name: string
  storage_path: string
  size: string
  folder_id: string | null
  owner_id: string
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export type PermanentDeleteFileResult = {
  id: string
}

export type ItemTarget = {
  kind: "folder" | "file"
  id: string
  name: string
}

export interface NavItem {
  id: NavId
  label: string
  icon: string
  badge: number
}

export interface SectionMeta {
  title: string
  subtitle: string
  emptyIcon: string
  emptyMsg: string
  emptyDesc: string
}

export interface NotificationItem {
  id: number
  avatar: string
  color: string
  text: string
  time: string
  unread: boolean
}

export type AccountTabId = "profile" | "settings" | "notifications" | "privacy" | "help"

export interface UserAccount {
  name: string
  email: string
  initials: string
  image: string | null
  plan: string
  storageLabel: string
  storageUsedGb: number
  storageTotalGb: number
}

export interface AuthUser {
  id: string
  name: string
  email: string
  image: string | null
}

export type ApiSuccess<T> = { status: "success"; data: T }

export type ApiErrorDetail = { path: string; message: string }

export type ApiError = { status: "error"; message: string; details?: ApiErrorDetail[] }

export type TokenPair = { accessToken: string; refreshToken: string }

export type AuthResult = {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export type UpdateMeInput = {
  name?: string
  email?: string
  image?: string | null
}

export interface AccountMenuItem {
  id: AccountTabId
  label: string
  icon: string
  color: string
  href: string
  description: string
}

export const ACCOUNT_TAB_IDS: AccountTabId[] = [
  "profile",
  "settings",
  "notifications",
  "privacy",
  "help",
]

export function isAccountTabId(value: string): value is AccountTabId {
  return (ACCOUNT_TAB_IDS as string[]).includes(value)
}

export const NAV_IDS: NavId[] = [
  "drive",
  "recent",
  "favorites",
  "shared",
  "trash",
  "archive",
  "offline",
]

export function isNavId(value: string): value is NavId {
  return (NAV_IDS as string[]).includes(value)
}
