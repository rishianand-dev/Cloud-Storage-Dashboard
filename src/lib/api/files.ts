import { apiBlobRequest, apiRequest } from "@/lib/api/client"
import type { FileRecord, PermanentDeleteFileResult } from "@/types"

export async function uploadFileRequest(file: File, folderId: string | null): Promise<FileRecord> {
  const body = new FormData()
  body.append("file", file)
  body.append("folder_id", folderId ?? "")
  return apiRequest<FileRecord>("/files", {
    method: "POST",
    body,
  })
}

export async function renameFileRequest(fileId: string, name: string): Promise<FileRecord> {
  return apiRequest<FileRecord>("/files/rename", {
    method: "POST",
    json: { file_id: fileId, name },
  })
}

export async function moveFileRequest(id: string, folderId: string | null): Promise<FileRecord> {
  return apiRequest<FileRecord>("/files/move", {
    method: "PATCH",
    json: { id, folder_id: folderId },
  })
}

export async function trashFileRequest(id: string): Promise<FileRecord> {
  return apiRequest<FileRecord>("/files/trash", {
    method: "PATCH",
    json: { id },
  })
}

export async function restoreFileRequest(id: string): Promise<FileRecord> {
  return apiRequest<FileRecord>("/files/restore", {
    method: "PATCH",
    json: { id },
  })
}

export async function permanentDeleteFileRequest(id: string): Promise<PermanentDeleteFileResult> {
  return apiRequest<PermanentDeleteFileResult>("/files/permanent", {
    method: "DELETE",
    json: { id },
  })
}

export async function previewFileBlob(id: string): Promise<Blob> {
  return apiBlobRequest(`/files/${id}/preview`)
}

export async function downloadFileBlob(id: string): Promise<Blob> {
  return apiBlobRequest(`/files/${id}/download`)
}

export async function downloadFileToDevice(id: string, filename: string): Promise<void> {
  const blob = await downloadFileBlob(id)
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
