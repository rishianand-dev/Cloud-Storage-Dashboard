export const DRIVE_ROOT_ID = "__drive_root__"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isUuid(id: string): boolean {
  return UUID_RE.test(id)
}

export function isFolderUuid(id: string): boolean {
  return isUuid(id)
}
