import { apiRequest } from "@/lib/api/client"
import type { Folder, PermanentDeleteFolderResult, SoftDeleteFolderResult } from "@/types"

export async function createFolderRequest(
  name: string,
  parentId: string | null,
  color?: string | null,
): Promise<Folder> {
  return apiRequest<Folder>("/folders", {
    method: "POST",
    json: { name, parent_id: parentId, color },
  })
}

export async function renameFolderRequest(id: string, name: string): Promise<Folder> {
  return apiRequest<Folder>(`/folders/${id}`, {
    method: "PATCH",
    json: { name },
  })
}

export async function moveFolderRequest(id: string, parentId: string | null): Promise<Folder> {
  return apiRequest<Folder>(`/folders/${id}/move`, {
    method: "PATCH",
    json: { parent_id: parentId },
  })
}

export async function trashFolderRequest(id: string): Promise<SoftDeleteFolderResult> {
  return apiRequest<SoftDeleteFolderResult>("/folders/trash", {
    method: "PATCH",
    json: { id },
  })
}

export async function permanentDeleteFolderRequest(id: string): Promise<PermanentDeleteFolderResult> {
  return apiRequest<PermanentDeleteFolderResult>("/folders/permanent", {
    method: "DELETE",
    json: { id },
  })
}
