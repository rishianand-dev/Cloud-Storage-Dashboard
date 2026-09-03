import type { Folder } from "@/types"

function foldersKey(userId: string): string {
  return `cloudvault.folders.${userId}`
}

function colorsKey(userId: string): string {
  return `cloudvault.folderColors.${userId}`
}

function normalizeFolder(value: unknown): Folder | null {
  if (!value || typeof value !== "object") return null
  const folder = value as Partial<Folder>
  if (
    typeof folder.id !== "string" ||
    typeof folder.name !== "string" ||
    (folder.parent_id !== null && typeof folder.parent_id !== "string") ||
    typeof folder.owner_id !== "string" ||
    (folder.deleted_at !== null && typeof folder.deleted_at !== "string") ||
    typeof folder.created_at !== "string" ||
    typeof folder.updated_at !== "string"
  ) {
    return null
  }

  return {
    id: folder.id,
    name: folder.name,
    color: typeof folder.color === "string" ? folder.color : null,
    parent_id: folder.parent_id,
    owner_id: folder.owner_id,
    deleted_at: folder.deleted_at,
    created_at: folder.created_at,
    updated_at: folder.updated_at,
  }
}

export function loadFolders(userId: string): Folder[] {
  if (typeof window === "undefined") return []
  try {
    window.localStorage.removeItem(colorsKey(userId))
    const raw = window.localStorage.getItem(foldersKey(userId))
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeFolder).filter((folder): folder is Folder => folder !== null)
  } catch {
    return []
  }
}

export function saveFolders(userId: string, folders: Folder[]): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(foldersKey(userId), JSON.stringify(folders))
}
