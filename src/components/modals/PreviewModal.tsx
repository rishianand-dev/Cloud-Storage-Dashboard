"use client"

import { useEffect, useState } from "react"
import type { FileItem, RootFile } from "@/types"
import { AuthAlert } from "@/components/auth/AuthAlert"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { FileTypeIcon } from "@/components/ui/FileTypeIcon"
import { Icon } from "@/components/ui/Icon"
import { downloadFileToDevice, fieldErrorsFromApi, previewFileBlob } from "@/lib/api"
import { previewKind } from "@/lib/files/map"
import { isUuid } from "@/lib/folders/ids"
import { ic } from "@/lib/constants/icons"

export function PreviewModal({
  item,
  onClose,
}: {
  item: FileItem | RootFile
  onClose: () => void
}) {
  const kind = previewKind(item.ext)
  const filename = item.ext ? `${item.name}.${item.ext}` : item.name
  const [objectUrl, setObjectUrl] = useState<string | null>(null)
  const [text, setText] = useState<string | null>(null)
  const [loading, setLoading] = useState(isUuid(item.id) && kind !== "other")
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    setObjectUrl(null)
    setText(null)
    setError(null)

    if (!isUuid(item.id) || kind === "other") {
      setLoading(false)
      return
    }

    let revoked: string | null = null
    let cancelled = false
    setLoading(true)

    ;(async () => {
      try {
        const blob = await previewFileBlob(item.id)
        if (cancelled) return
        if (kind === "text") {
          setText(await blob.text())
        } else {
          const url = URL.createObjectURL(blob)
          revoked = url
          setObjectUrl(url)
        }
      } catch (caught) {
        if (!cancelled) setError(fieldErrorsFromApi(caught).form)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
      if (revoked) URL.revokeObjectURL(revoked)
    }
  }, [item.id, kind])

  async function onDownload() {
    if (!isUuid(item.id)) return
    setDownloading(true)
    setError(null)
    try {
      await downloadFileToDevice(item.id, filename)
    } catch (caught) {
      setError(fieldErrorsFromApi(caught).form)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalCard
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 660,
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: 0,
        }}
      >
        <div
          style={{
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderBottom: "1px solid rgba(163,177,198,0.15)",
            flexShrink: 0,
          }}
        >
          <FileTypeIcon
            icon={item.icon}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
            ext={item.ext}
            size={44}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#1A1D2E",
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {filename}
            </div>
            <div style={{ fontSize: 12, color: "#8B90A7", marginTop: 2 }}>
              {item.size} · Modified {item.modified}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {isUuid(item.id) && (
              <button
                type="button"
                onClick={onDownload}
                disabled={downloading}
                className="action-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 12,
                  border: "none",
                  cursor: downloading ? "default" : "pointer",
                  background: "#F4F6FA",
                  color: "#5A5F7A",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                <Icon d={ic.download} size={14} color="#8B90A7" /> {downloading ? "Saving…" : "Download"}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="icon-btn"
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F4F6FA",
              }}
            >
              <Icon d={ic.x} size={16} color="#8B90A7" />
            </button>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            background: "rgba(244,246,250,0.5)",
            minHeight: 280,
          }}
        >
          {error && (
            <div style={{ width: "100%" }}>
              <AuthAlert tone="error" message={error} />
            </div>
          )}
          {loading && <div style={{ fontSize: 14, fontWeight: 600, color: "#8B90A7" }}>Loading preview…</div>}
          {!loading && !error && kind === "image" && objectUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={objectUrl}
              alt={filename}
              style={{ maxWidth: "100%", maxHeight: 400, borderRadius: 16, objectFit: "contain" }}
            />
          )}
          {!loading && !error && kind === "pdf" && objectUrl && (
            <iframe
              title={filename}
              src={objectUrl}
              style={{ width: "100%", height: 420, border: "none", borderRadius: 16, background: "#fff" }}
            />
          )}
          {!loading && !error && kind === "video" && objectUrl && (
            <video src={objectUrl} controls style={{ width: "100%", maxHeight: 400, borderRadius: 16 }} />
          )}
          {!loading && !error && kind === "audio" && objectUrl && (
            <audio src={objectUrl} controls style={{ width: "100%" }} />
          )}
          {!loading && !error && kind === "text" && text !== null && (
            <pre
              style={{
                width: "100%",
                maxHeight: 400,
                overflow: "auto",
                margin: 0,
                padding: 16,
                borderRadius: 16,
                background: "#fff",
                fontSize: 12.5,
                lineHeight: 1.55,
                color: "#1A1D2E",
              }}
            >
              {text}
            </pre>
          )}
          {!loading && !error && kind === "other" && (
            <div style={{ textAlign: "center" }}>
              <FileTypeIcon icon={item.icon} iconBg={item.iconBg} iconColor={item.iconColor} ext={item.ext} size={72} />
              <div style={{ fontSize: 14, color: "#8B90A7", marginTop: 16 }}>
                Inline preview is not available for this type. Download to view it.
              </div>
              {isUuid(item.id) && (
                <button
                  type="button"
                  onClick={onDownload}
                  className="btn-primary"
                  style={{
                    marginTop: 20,
                    padding: "11px 28px",
                    borderRadius: 14,
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  Download
                </button>
              )}
            </div>
          )}
        </div>
      </ModalCard>
    </>
  )
}
