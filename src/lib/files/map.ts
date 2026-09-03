import type { FileItem, FileRecord, Folder, QuickFolder } from "@/types"
import { formatFolderTime } from "@/lib/folders/map"

export const MAX_FILE_BYTES = 50 * 1024 * 1024

export function upsertFile(files: FileRecord[], file: FileRecord): FileRecord[] {
  const index = files.findIndex((item) => item.id === file.id)
  if (index === -1) return [...files, file]
  const next = [...files]
  next[index] = file
  return next
}

export function removeFile(files: FileRecord[], id: string): FileRecord[] {
  return files.filter((file) => file.id !== id)
}

export function activeFilesInFolder(files: FileRecord[], folderId: string | null): FileRecord[] {
  return files.filter((file) => file.folder_id === folderId && !file.deleted_at)
}

export function trashVisibleFiles(files: FileRecord[], folders: Folder[]): FileRecord[] {
  const deletedFolderIds = new Set(folders.filter((folder) => folder.deleted_at).map((folder) => folder.id))
  return files.filter(
    (file) => file.deleted_at && (file.folder_id === null || !deletedFolderIds.has(file.folder_id)),
  )
}

export function syncFilesWithFolders(files: FileRecord[], folders: Folder[]): FileRecord[] {
  const byId = new Map(folders.map((folder) => [folder.id, folder]))
  return files.flatMap((file) => {
    if (!file.folder_id) return [file]
    const folder = byId.get(file.folder_id)
    if (!folder) return []
    if (folder.deleted_at && !file.deleted_at) {
      return [{ ...file, deleted_at: folder.deleted_at }]
    }
    return [file]
  })
}

export function fileCountInFolder(files: FileRecord[], folderId: string, deleted: boolean): number {
  return files.filter((file) => file.folder_id === folderId && Boolean(file.deleted_at) === deleted).length
}

export function addFileCounts(folders: QuickFolder[], files: FileRecord[], deleted: boolean): QuickFolder[] {
  return folders.map((folder) => ({
    ...folder,
    count: folder.count + fileCountInFolder(files, folder.id, deleted),
  }))
}

export function formatFileSize(bytesValue: string): string {
  const bytes = Number(bytesValue)
  if (!Number.isFinite(bytes) || bytes < 0) return "—"
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`
  const gb = mb / 1024
  return `${gb < 10 ? gb.toFixed(1) : Math.round(gb)} GB`
}

export function fileStemAndExt(file: FileRecord): { stem: string; ext: string } {
  const ext = file.extension.replace(/^\./, "")
  const name = file.name
  if (ext && name.toLowerCase().endsWith(`.${ext.toLowerCase()}`)) {
    return { stem: name.slice(0, -(ext.length + 1)) || name, ext }
  }
  return { stem: name, ext }
}

function iconForExt(ext: string, mime: string): { icon: string; iconBg: string; iconColor: string } {
  const type = ext.toLowerCase()
  if (mime.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "webp", "svg", "heic"].includes(type)) {
    return { icon: "image", iconBg: "#F5EEFF", iconColor: "#A855F7" }
  }
  if (mime.startsWith("video/") || ["mp4", "mov", "webm", "mkv"].includes(type)) {
    return { icon: "video", iconBg: "#EEF1FF", iconColor: "#5B7CFA" }
  }
  if (mime.startsWith("audio/") || ["mp3", "wav", "ogg", "m4a"].includes(type)) {
    return { icon: "music", iconBg: "#E8F5FF", iconColor: "#0EA5E9" }
  }
  if (["xls", "xlsx", "csv"].includes(type)) {
    return { icon: "sheet", iconBg: "#EEFAF5", iconColor: "#10B981" }
  }
  if (["ppt", "pptx"].includes(type)) {
    return { icon: "slides", iconBg: "#FFF3E0", iconColor: "#FF6B35" }
  }
  if (type === "pdf") {
    return { icon: "doc", iconBg: "#FCE8E8", iconColor: "#EF4444" }
  }
  if (["zip", "rar", "7z", "tar", "gz"].includes(type)) {
    return { icon: "inbox", iconBg: "#E8F5FF", iconColor: "#0EA5E9" }
  }
  return { icon: "doc", iconBg: "#EEF1FF", iconColor: "#5B7CFA" }
}

export function toFileItem(file: FileRecord): FileItem {
  const { stem, ext } = fileStemAndExt(file)
  const icons = iconForExt(ext, file.mime_type)
  return {
    id: file.id,
    name: stem,
    ext,
    ...icons,
    owner: "me",
    size: formatFileSize(file.size),
    modified: formatFolderTime(file.updated_at),
    starred: false,
    section: file.deleted_at ? ["trash"] : ["drive", "recent"],
  }
}

export function previewKind(ext: string): "image" | "pdf" | "video" | "audio" | "text" | "other" {
  const type = ext.toLowerCase()
  if (["png", "jpg", "jpeg", "gif", "webp", "svg", "heic", "bmp"].includes(type)) return "image"
  if (type === "pdf") return "pdf"
  if (["mp4", "mov", "webm", "mkv"].includes(type)) return "video"
  if (["mp3", "wav", "ogg", "m4a"].includes(type)) return "audio"
  if (["txt", "md", "json", "csv", "log"].includes(type)) return "text"
  return "other"
}
