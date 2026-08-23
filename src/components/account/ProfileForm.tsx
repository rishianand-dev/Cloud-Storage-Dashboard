"use client"

import { useState, type FormEvent } from "react"
import { AuthAlert } from "@/components/auth/AuthAlert"
import { UserAvatar } from "@/components/ui/UserAvatar"
import { useAuth } from "@/hooks/useAuth"
import { fieldErrorsFromApi } from "@/lib/api"
import { validateEmail, validateImageUrl, validateName } from "@/lib/auth"

export function ProfileForm() {
  const { account, updateProfile } = useAuth()
  const [name, setName] = useState(account.name)
  const [email, setEmail] = useState(account.email)
  const [image, setImage] = useState(account.image ?? "")
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    image?: string
    form?: string
    details?: { path: string; message: string }[]
  }>({})

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = {
      name: validateName(name) ?? undefined,
      email: validateEmail(email) ?? undefined,
      image: validateImageUrl(image) ?? undefined,
    }
    setErrors(nextErrors)
    setSuccess(null)
    if (nextErrors.name || nextErrors.email || nextErrors.image) return

    const payload = {
      name: name.trim(),
      email: email.trim(),
      image: image.trim() ? image.trim() : null,
    }

    setPending(true)
    try {
      await updateProfile(payload)
      setSuccess("Profile updated")
    } catch (error) {
      const parsed = fieldErrorsFromApi(error)
      setErrors({
        form: parsed.form,
        name: parsed.fields.name,
        email: parsed.fields.email,
        image: parsed.fields.image,
        details: parsed.details,
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {success && <AuthAlert tone="success" message={success} />}
      {errors.form && <AuthAlert tone="error" message={errors.form} details={errors.details} />}

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <UserAvatar name={name || account.name} initials={account.initials} image={image || account.image} size={72} radius={22} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1A1D2E" }}>{name || account.name}</div>
          <div style={{ fontSize: 13, color: "#8B90A7", marginTop: 2 }}>{email || account.email}</div>
        </div>
      </div>

      <label style={{ display: "block", marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#8B90A7", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>
          Full name
        </div>
        <input
          className="neu-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "12px 16px", borderRadius: 14, fontSize: 14, fontWeight: 600 }}
        />
        {errors.name && <div style={{ fontSize: 12, color: "#EF4444", fontWeight: 600, marginTop: 6 }}>{errors.name}</div>}
      </label>

      <label style={{ display: "block", marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#8B90A7", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>
          Email
        </div>
        <input
          className="neu-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px 16px", borderRadius: 14, fontSize: 14, fontWeight: 600 }}
        />
        {errors.email && <div style={{ fontSize: 12, color: "#EF4444", fontWeight: 600, marginTop: 6 }}>{errors.email}</div>}
      </label>

      <label style={{ display: "block", marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#8B90A7", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>
          Photo URL
        </div>
        <input
          className="neu-field"
          type="url"
          placeholder="https://…"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ width: "100%", padding: "12px 16px", borderRadius: 14, fontSize: 14, fontWeight: 600 }}
        />
        {errors.image && <div style={{ fontSize: 12, color: "#EF4444", fontWeight: 600, marginTop: 6 }}>{errors.image}</div>}
      </label>

      <div style={{ fontSize: 11, fontWeight: 700, color: "#8B90A7", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>
        Plan
      </div>
      <div className="neu-field" style={{ padding: "12px 16px", borderRadius: 14, fontSize: 14, fontWeight: 600, color: "#1A1D2E", marginBottom: 18 }}>
        {account.storageLabel}
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#8B90A7", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>
          Storage
        </div>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 14,
            background: "#F4F6FA",
            boxShadow: "4px 4px 10px rgba(163,177,198,0.25), -3px -3px 8px rgba(255,255,255,0.85)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E" }}>{account.storageUsedGb} GB used</span>
            <span style={{ fontSize: 12, color: "#8B90A7" }}>of {account.storageTotalGb} GB</span>
          </div>
          <div
            style={{
              height: 6,
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "inset 3px 3px 7px rgba(163,177,198,0.4), inset -2px -2px 5px rgba(255,255,255,0.8)",
            }}
          >
            <div
              style={{
                width: `${(account.storageUsedGb / account.storageTotalGb) * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #5B7CFA, #A855F7)",
                borderRadius: 6,
              }}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={pending}
        style={{
          marginTop: 24,
          padding: "12px 22px",
          borderRadius: 14,
          border: "none",
          cursor: pending ? "wait" : "pointer",
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          opacity: pending ? 0.8 : 1,
        }}
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  )
}
