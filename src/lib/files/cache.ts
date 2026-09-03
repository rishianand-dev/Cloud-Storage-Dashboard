import type { FileRecord } from "@/types"

function filesKey(userId: string): string {
  return `cloudvault.files.${userId}`
}

function normalizeSize(value: unknown): string | null {
  if (typeof value === "string") return value
  if (typeof value === "number" && Number.isFinite(value)) return String(value)
  return null
}

function normalizeFile(value: unknown): FileRecord | null {
  if (!value || typeof value !== "object") return null
  const file = value as Partial<FileRecord>
  const size = normalizeSize(file.size)
  if (
    typeof file.id !== "string" ||
    typeof file.name !== "string" ||
    typeof file.extension !== "string" ||
    typeof file.mime_type !== "string" ||
    typeof file.storage_name !== "string" ||
    typeof file.storage_path !== "string" ||
    size === null ||
    (file.folder_id !== null && typeof file.folder_id !== "string") ||
    typeof file.owner_id !== "string" ||
    (file.deleted_at !== null && typeof file.deleted_at !== "string") ||
    typeof file.created_at !== "string" ||
    typeof file.updated_at !== "string"
  ) {
    return null
  }

  return {
    id: file.id,
    name: file.name,
    extension: file.extension,
    mime_type: file.mime_type,
    storage_name: file.storage_name,
    storage_path: file.storage_path,
    size,
    folder_id: file.folder_id,
    owner_id: file.owner_id,
    deleted_at: file.deleted_at,
    created_at: file.created_at,
    updated_at: file.updated_at,
  }
}

export function loadFiles(userId: string): FileRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(filesKey(userId))
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeFile).filter((file): file is FileRecord => file !== null)
  } catch {
    return []
  }
}

export function saveFiles(userId: string, files: FileRecord[]): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(filesKey(userId), JSON.stringify(files))
}
