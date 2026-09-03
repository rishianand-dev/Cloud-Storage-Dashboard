"use client"

import { useState, type FormEvent } from "react"
import { AuthAlert } from "@/components/auth/AuthAlert"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { fieldErrorsFromApi } from "@/lib/api"
import { useFolders } from "@/hooks/useFolders"
import { useFiles } from "@/hooks/useFiles"
import type { RenameTarget } from "@/types"

function validateName(name: string): string | null {
  const trimmed = name.trim()
  if (!trimmed) return "Name is required"
  if (trimmed.length > 255) return "Name must be 255 characters or fewer"
  return null
}

export function RenameModal({ item, onClose }: { item: RenameTarget; onClose: () => void }) {
  const { renameFolder } = useFolders()
  const { renameFile } = useFiles()
  const [name, setName] = useState(item.name)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<{
    form?: string
    name?: string
    details?: { path: string; message: string }[]
  }>({})

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nameError = validateName(name)
    if (nameError) {
      setError({ name: nameError })
      return
    }

    setPending(true)
    setError({})
    try {
      if (item.kind === "folder") await renameFolder(item.id, name.trim())
      else await renameFile(item.id, name.trim())
      onClose()
    } catch (caught) {
      const parsed = fieldErrorsFromApi(caught)
      setError({
        form: parsed.form,
        name: parsed.fields.name,
        details: parsed.details,
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <Backdrop onClick={() => { if (!pending) onClose() }} />
      <ModalCard style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 360, padding: 28 }}>
        <form onSubmit={onSubmit}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1A1D2E", marginBottom: 20 }}>Rename</div>
          {error.form && <AuthAlert tone="error" message={error.form} details={error.details} />}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => e.target.select()}
            disabled={pending}
            className="neu-field"
            style={{
              width: "100%",
              padding: "13px 16px",
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 600,
              marginBottom: error.name ? 8 : 20,
            }}
          />
          {error.name && (
            <div style={{ fontSize: 12, color: "#EF4444", fontWeight: 600, marginBottom: 16 }}>{error.name}</div>
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
              type="submit"
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
              {pending ? "Saving…" : "Rename"}
            </button>
          </div>
        </form>
      </ModalCard>
    </>
  )
}
