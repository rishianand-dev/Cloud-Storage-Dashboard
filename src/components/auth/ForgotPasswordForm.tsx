"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { AuthAlert } from "@/components/auth/AuthAlert"
import { AuthField } from "@/components/auth/AuthField"
import { fieldErrorsFromApi, forgotPasswordRequest } from "@/lib/api"
import { validateEmail } from "@/lib/auth"
import { ic } from "@/lib/constants/icons"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState<string | null>(null)
  const [errors, setErrors] = useState<{
    email?: string
    form?: string
    details?: { path: string; message: string }[]
  }>({})
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const emailError = validateEmail(email) ?? undefined
    setErrors({ email: emailError })
    setSuccess(null)
    if (emailError) return

    setPending(true)
    try {
      const message = await forgotPasswordRequest(email)
      setSuccess(message)
    } catch (error) {
      const parsed = fieldErrorsFromApi(error)
      setErrors({ form: parsed.form, email: parsed.fields.email, details: parsed.details })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {success && <AuthAlert tone="success" message={success} />}
      {errors.form && <AuthAlert tone="error" message={errors.form} details={errors.details} />}

      <AuthField
        label="Email"
        icon={ic.mail}
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <button
        type="submit"
        className="btn-primary"
        disabled={pending}
        style={{
          width: "100%",
          padding: "13px 0",
          borderRadius: 16,
          border: "none",
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: pending ? "wait" : "pointer",
          opacity: pending ? 0.8 : 1,
        }}
      >
        {pending ? "Sending…" : "Send reset link"}
      </button>

      <p style={{ margin: "18px 0 0", textAlign: "center", fontSize: 13.5, color: "#8B90A7" }}>
        <Link href="/login" style={{ color: "#5B7CFA", fontWeight: 700, textDecoration: "none" }}>
          Back to sign in
        </Link>
      </p>
    </form>
  )
}
