import type { Folder, FolderBreadcrumb, FolderMoveDestination } from "@/types"

export function upsertFolder(folders: Folder[], folder: Folder): Folder[] {
  const index = folders.findIndex((item) => item.id === folder.id)
  if (index === -1) return [...folders, folder]
  const next = [...folders]
  next[index] = folder
  return next
}

export function collectTreeIds(folders: Folder[], rootId: string): string[] {
  const ids = [rootId]
  const queue = [rootId]

  while (queue.length > 0) {
    const parentId = queue.shift()
    if (!parentId) continue
    for (const child of folders) {
      if (child.parent_id === parentId && !ids.includes(child.id)) {
        ids.push(child.id)
        queue.push(child.id)
      }
    }
  }

  return ids
}

export function removeFolderTree(folders: Folder[], rootId: string): Folder[] {
  const blocked = new Set(collectTreeIds(folders, rootId))
  return folders.filter((folder) => !blocked.has(folder.id))
}

export function markFolderTreeDeleted(folders: Folder[], rootId: string, deletedAt: string): Folder[] {
  const blocked = new Set(collectTreeIds(folders, rootId))
  return folders.map((folder) => (blocked.has(folder.id) ? { ...folder, deleted_at: deletedAt } : folder))
}

export function activeChildren(folders: Folder[], parentId: string | null): Folder[] {
  return folders.filter((folder) => folder.parent_id === parentId && !folder.deleted_at)
}

export function childCount(folders: Folder[], parentId: string, deleted: boolean): number {
  return folders.filter((folder) => folder.parent_id === parentId && Boolean(folder.deleted_at) === deleted).length
}

export function trashRoots(folders: Folder[]): Folder[] {
  const deleted = folders.filter((folder) => folder.deleted_at)
  const deletedIds = new Set(deleted.map((folder) => folder.id))
  return deleted.filter((folder) => folder.parent_id === null || !deletedIds.has(folder.parent_id))
}

export function folderBreadcrumbs(folders: Folder[], currentParentId: string | null): FolderBreadcrumb[] {
  const crumbs: FolderBreadcrumb[] = [{ id: null, name: "My Drive" }]
  if (!currentParentId) return crumbs

  const chain: Folder[] = []
  let cursor: string | null = currentParentId
  const seen = new Set<string>()

  while (cursor && !seen.has(cursor)) {
    seen.add(cursor)
    const folder = folders.find((item) => item.id === cursor)
    if (!folder) break
    chain.unshift(folder)
    cursor = folder.parent_id
  }

  return [...crumbs, ...chain.map((folder) => ({ id: folder.id, name: folder.name }))]
}

export function moveDestinations(folders: Folder[], movingId: string): FolderMoveDestination[] {
  const blocked = new Set(collectTreeIds(folders, movingId))
  const destinations: FolderMoveDestination[] = [{ id: null, name: "My Drive", depth: 0 }]

  function walk(parentId: string | null, depth: number) {
    const children = activeChildren(folders, parentId).sort((a, b) => a.name.localeCompare(b.name))
    for (const child of children) {
      if (blocked.has(child.id)) continue
      destinations.push({ id: child.id, name: child.name, depth })
      walk(child.id, depth + 1)
    }
  }

  walk(null, 1)
  return destinations
}

export function folderDestinations(folders: Folder[]): FolderMoveDestination[] {
  return moveDestinations(folders, "__none__")
}
