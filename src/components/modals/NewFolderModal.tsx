"use client"

import { useState, type FormEvent } from "react"
import { AuthAlert } from "@/components/auth/AuthAlert"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { fieldErrorsFromApi } from "@/lib/api"
import { ic } from "@/lib/constants/icons"
import { FOLDER_COLORS } from "@/lib/folders/map"
import { useFolders } from "@/hooks/useFolders"

function validateFolderName(name: string): string | null {
  const trimmed = name.trim()
  if (!trimmed) return "Name is required"
  if (trimmed.length > 255) return "Name must be 255 characters or fewer"
  return null
}

export function NewFolderModal({ onClose }: { onClose: () => void }) {
  const { createFolder, breadcrumbs } = useFolders()
  const [name, setName] = useState("Untitled Folder")
  const [color, setColor] = useState("#5B7CFA")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<{
    form?: string
    name?: string
    details?: { path: string; message: string }[]
  }>({})
  const location = breadcrumbs[breadcrumbs.length - 1]?.name ?? "My Drive"

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nameError = validateFolderName(name)
    if (nameError) {
      setError({ name: nameError })
      return
    }

    setPending(true)
    setError({})
    try {
      await createFolder(name.trim(), color)
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
      <ModalCard style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 380, padding: 28 }}>
        <form onSubmit={onSubmit}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ fontSize: 19, fontWeight: 800, color: "#1A1D2E" }}>New Folder</div>
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
            Created in <strong style={{ color: "#5B7CFA" }}>{location}</strong>
          </div>
          {error.form && <AuthAlert tone="error" message={error.form} details={error.details} />}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 22,
                background: `${color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `8px 8px 20px ${color}25, -6px -6px 14px rgba(255,255,255,0.9)`,
                transition: "all 0.3s ease",
              }}
            >
              <Icon d={ic.folder} size={36} color={color} strokeWidth={1.4} />
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#8B90A7",
                marginBottom: 8,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Folder Name
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => e.target.select()}
              disabled={pending}
              className="neu-field"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 600,
              }}
            />
            {error.name && (
              <div style={{ fontSize: 12, color: "#EF4444", fontWeight: 600, marginTop: 8 }}>{error.name}</div>
            )}
          </div>
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#8B90A7",
                marginBottom: 10,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Folder Color
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {FOLDER_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  disabled={pending}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 9,
                    border: color === c ? `3px solid ${c}` : "3px solid transparent",
                    background: c,
                    cursor: pending ? "default" : "pointer",
                    boxShadow: color === c ? `0 0 0 2px white, 3px 3px 8px ${c}50` : `2px 2px 6px ${c}30`,
                    transition: "all 0.2s ease",
                    transform: color === c ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
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
              {pending ? "Creating…" : "Create Folder"}
            </button>
          </div>
        </form>
      </ModalCard>
    </>
  )
}
