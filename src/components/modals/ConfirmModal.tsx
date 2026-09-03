"use client"

import { AuthAlert } from "@/components/auth/AuthAlert"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"
import type { ApiErrorDetail } from "@/types"

export function ConfirmModal({
  title,
  message,
  confirmLabel,
  pendingLabel,
  pending,
  error,
  details,
  danger = true,
  onConfirm,
  onClose,
}: {
  title: string
  message: string
  confirmLabel: string
  pendingLabel?: string
  pending?: boolean
  error?: string | null
  details?: ApiErrorDetail[]
  danger?: boolean
  onConfirm: () => void
  onClose: () => void
}) {
  return (
    <>
      <Backdrop onClick={() => { if (!pending) onClose() }} />
      <ModalCard style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 380, padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1A1D2E" }}>{title}</div>
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
        {error && <AuthAlert tone="error" message={error} details={details} />}
        <p style={{ fontSize: 14, color: "#5A5F7A", lineHeight: 1.55, margin: "0 0 22px" }}>{message}</p>
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
            onClick={onConfirm}
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
              background: danger ? "#EF4444" : undefined,
              opacity: pending ? 0.7 : 1,
            }}
          >
            {pending ? pendingLabel || "Working…" : confirmLabel}
          </button>
        </div>
      </ModalCard>
    </>
  )
}
