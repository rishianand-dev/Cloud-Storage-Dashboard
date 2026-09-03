"use client"

import { useRef, useState } from "react"
import { AuthAlert } from "@/components/auth/AuthAlert"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { fieldErrorsFromApi } from "@/lib/api"
import { ic } from "@/lib/constants/icons"
import { MAX_FILE_BYTES, formatFileSize } from "@/lib/files/map"
import { useFiles } from "@/hooks/useFiles"
import { useFolders } from "@/hooks/useFolders"

type UploadRow = {
  name: string
  size: string
  status: "pending" | "uploading" | "done" | "error"
  error?: string
}

function toRows(list: File[]): UploadRow[] {
  return list.map((file) => ({
    name: file.name,
    size: formatFileSize(String(file.size)),
    status: file.size > MAX_FILE_BYTES ? "error" : "pending",
    error: file.size > MAX_FILE_BYTES ? "Exceeds the 50 MB upload limit" : undefined,
  }))
}

export function UploadModal({ onClose }: { onClose: () => void }) {
  const { uploadFiles } = useFiles()
  const { breadcrumbs } = useFolders()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [picked, setPicked] = useState<File[]>([])
  const [rows, setRows] = useState<UploadRow[]>([])
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<{ form: string; details?: { path: string; message: string }[] } | null>(null)
  const location = breadcrumbs[breadcrumbs.length - 1]?.name ?? "My Drive"

  function takeFiles(list: FileList | File[]) {
    const next = Array.from(list)
    setPicked(next)
    setRows(toRows(next))
    setError(null)
  }

  async function onUpload() {
    const valid = picked.filter((file) => file.size <= MAX_FILE_BYTES)
    if (valid.length === 0) {
      setError({ form: "Choose a file under 50 MB to upload" })
      return
    }

    setPending(true)
    setError(null)
    try {
      for (let index = 0; index < valid.length; index += 1) {
        const file = valid[index]
        setRows((prev) =>
          prev.map((row) => (row.name === file.name ? { ...row, status: "uploading" } : row)),
        )
        await uploadFiles([file])
        setRows((prev) => prev.map((row) => (row.name === file.name ? { ...row, status: "done" } : row)))
      }
      onClose()
    } catch (caught) {
      const parsed = fieldErrorsFromApi(caught)
      setError(parsed)
      setRows((prev) =>
        prev.map((row) => (row.status === "uploading" ? { ...row, status: "error", error: parsed.form } : row)),
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <Backdrop onClick={() => { if (!pending) onClose() }} />
      <ModalCard style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 480, padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#1A1D2E" }}>Upload Files</div>
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="icon-btn"
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "none",
              cursor: pending ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F4F6FA",
            }}
          >
            <Icon d={ic.x} size={16} color="#8B90A7" />
          </button>
        </div>
        <div style={{ fontSize: 12.5, color: "#8B90A7", marginBottom: 16 }}>
          Uploading to <strong style={{ color: "#5B7CFA" }}>{location}</strong>
        </div>
        {error && <AuthAlert tone="error" message={error.form} details={error.details} />}
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={(event) => {
            if (event.target.files) takeFiles(event.target.files)
            event.target.value = ""
          }}
        />
        <div
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            if (event.dataTransfer.files.length) takeFiles(event.dataTransfer.files)
          }}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "#5B7CFA" : "rgba(163,177,198,0.5)"}`,
            borderRadius: 18,
            padding: "32px 24px",
            textAlign: "center",
            transition: "all 0.2s ease",
            background: dragging ? "rgba(91,124,250,0.04)" : "rgba(255,255,255,0.4)",
            marginBottom: 20,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: "#EEF1FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
              boxShadow: "4px 4px 10px rgba(91,124,250,0.2), -3px -3px 8px rgba(255,255,255,0.8)",
            }}
          >
            <Icon d={ic.upload} size={26} color="#5B7CFA" strokeWidth={1.8} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E", marginBottom: 6 }}>Drop files here</div>
          <div style={{ fontSize: 13, color: "#8B90A7" }}>
            or <span style={{ color: "#5B7CFA", fontWeight: 600 }}>browse from your device</span>
          </div>
          <div style={{ fontSize: 11.5, color: "#C4C9DC", marginTop: 8 }}>Max file size: 50 MB per file</div>
        </div>
        {rows.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1A1D2E", marginBottom: 12 }}>
              {rows.length} {rows.length === 1 ? "file" : "files"} selected
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 220, overflowY: "auto" }}>
              {rows.map((row) => (
                <div
                  key={row.name}
                  style={{
                    background: "#F4F6FA",
                    borderRadius: 14,
                    padding: "12px 14px",
                    boxShadow: "4px 4px 10px rgba(163,177,198,0.3), -3px -3px 8px rgba(255,255,255,0.8)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 600,
                          color: "#1A1D2E",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row.name}
                      </div>
                      <div style={{ fontSize: 11, color: row.status === "error" ? "#EF4444" : "#8B90A7" }}>
                        {row.error || row.size}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color:
                          row.status === "done"
                            ? "#10B981"
                            : row.status === "error"
                              ? "#EF4444"
                              : "#5B7CFA",
                        flexShrink: 0,
                      }}
                    >
                      {row.status === "done"
                        ? "Done"
                        : row.status === "uploading"
                          ? "Uploading…"
                          : row.status === "error"
                            ? "Failed"
                            : "Ready"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="action-btn"
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 14,
              border: "none",
              cursor: pending ? "default" : "pointer",
              color: "#5A5F7A",
              fontSize: 14,
              fontWeight: 600,
              background: "#F4F6FA",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onUpload}
            disabled={pending || picked.length === 0}
            className="btn-primary"
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 14,
              border: "none",
              cursor: pending || picked.length === 0 ? "default" : "pointer",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              opacity: pending || picked.length === 0 ? 0.7 : 1,
            }}
          >
            {pending ? "Uploading…" : "Upload"}
          </button>
        </div>
      </ModalCard>
    </>
  )
}
