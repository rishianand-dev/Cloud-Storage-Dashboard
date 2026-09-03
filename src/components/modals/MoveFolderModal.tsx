"use client"

import { useMemo, useState } from "react"
import { AuthAlert } from "@/components/auth/AuthAlert"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { fieldErrorsFromApi } from "@/lib/api"
import { ic } from "@/lib/constants/icons"
import { useFolders } from "@/hooks/useFolders"
import { useFiles } from "@/hooks/useFiles"
import type { ItemTarget } from "@/types"

export function MoveFolderModal({ item, onClose }: { item: ItemTarget; onClose: () => void }) {
  const { moveFolder, moveDestinations, folderDestinations, folders } = useFolders()
  const { moveFile, files } = useFiles()
  const destinations = useMemo(
    () => (item.kind === "folder" ? moveDestinations(item.id) : folderDestinations),
    [folderDestinations, item.id, item.kind, moveDestinations],
  )
  const currentParentId =
    item.kind === "folder"
      ? (folders.find((folder) => folder.id === item.id)?.parent_id ?? null)
      : (files.find((file) => file.id === item.id)?.folder_id ?? null)
  const [destinationId, setDestinationId] = useState<string | null>(currentParentId)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<{ form: string; details?: { path: string; message: string }[] } | null>(null)

  async function onSubmit() {
    if (destinationId === currentParentId) {
      onClose()
      return
    }
    setPending(true)
    setError(null)
    try {
      await (item.kind === "folder" ? moveFolder(item.id, destinationId) : moveFile(item.id, destinationId))
      onClose()
    } catch (caught) {
      setError(fieldErrorsFromApi(caught))
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <Backdrop onClick={() => { if (!pending) onClose() }} />
      <ModalCard style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1A1D2E" }}>
            Move {item.kind === "file" ? "file" : "folder"}
          </div>
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
        <div style={{ fontSize: 13, color: "#8B90A7", marginBottom: 14 }}>
          Move <strong style={{ color: "#1A1D2E" }}>{item.name}</strong> to:
        </div>
        {error && <AuthAlert tone="error" message={error.form} details={error.details} />}
        <div
          style={{
            maxHeight: 280,
            overflowY: "auto",
            borderRadius: 16,
            background: "#F4F6FA",
            boxShadow: "inset 4px 4px 10px rgba(163,177,198,0.25), inset -3px -3px 8px rgba(255,255,255,0.8)",
            padding: 8,
            marginBottom: 20,
          }}
        >
          {destinations.map((destination) => {
            const selected =
              destination.id === destinationId || (destination.id === null && destinationId === null)
            return (
              <button
                key={destination.id ?? "root"}
                type="button"
                onClick={() => setDestinationId(destination.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 12px",
                  paddingLeft: 12 + destination.depth * 16,
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  background: selected ? "rgba(91,124,250,0.12)" : "transparent",
                  color: "#1A1D2E",
                  fontSize: 13.5,
                  fontWeight: selected ? 700 : 500,
                }}
              >
                <Icon d={ic.folder} size={16} color={selected ? "#5B7CFA" : "#8B90A7"} />
                {destination.name}
              </button>
            )
          })}
        </div>
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
            onClick={onSubmit}
            disabled={pending}
            className="btn-primary"
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 14,
              border: "none",
              cursor: pending ? "default" : "pointer",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              opacity: pending ? 0.7 : 1,
            }}
          >
            {pending ? "Moving…" : "Move"}
          </button>
        </div>
      </ModalCard>
    </>
  )
}
