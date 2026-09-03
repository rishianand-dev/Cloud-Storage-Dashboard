import type { Folder, QuickFolder } from "@/types"
import { DRIVE_ROOT_ID } from "@/lib/folders/ids"
import { childCount } from "@/lib/folders/tree"

export const FOLDER_COLORS = ["#5B7CFA", "#A855F7", "#10B981", "#F59E0B", "#EC4899", "#EF4444", "#0EA5E9", "#6B7280"]

const DEFAULT_FOLDER_COLOR = "#5B7CFA"

const COLOR_BACKGROUNDS: Record<string, string> = {
  "#5B7CFA": "#EEF1FF",
  "#A855F7": "#F5EEFF",
  "#10B981": "#EEFAF5",
  "#F59E0B": "#FFF8EC",
  "#EC4899": "#FDECF4",
  "#EF4444": "#FCE8E8",
  "#0EA5E9": "#E8F5FF",
  "#6B7280": "#EEF0F4",
}

export function folderDisplayColor(color: string | null | undefined): string {
  return color || DEFAULT_FOLDER_COLOR
}

export function bgFromColor(color: string): string {
  return COLOR_BACKGROUNDS[color] ?? `${color}18`
}

export function formatFolderTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "—"
  const diff = Date.now() - date.getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  return date.toLocaleDateString()
}

export function driveRootFolder(count: number): QuickFolder {
  return {
    id: DRIVE_ROOT_ID,
    name: "My Drive",
    count,
    modified: "—",
    color: DEFAULT_FOLDER_COLOR,
    bg: bgFromColor(DEFAULT_FOLDER_COLOR),
    files: [],
  }
}

export function toQuickFolder(folder: Folder, folders: Folder[]): QuickFolder {
  const color = folderDisplayColor(folder.color)
  return {
    id: folder.id,
    name: folder.name,
    count: childCount(folders, folder.id, Boolean(folder.deleted_at)),
    modified: formatFolderTime(folder.updated_at),
    color,
    bg: bgFromColor(color),
    files: [],
  }
}
