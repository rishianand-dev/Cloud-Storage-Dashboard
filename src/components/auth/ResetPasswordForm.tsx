"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthAlert } from "@/components/auth/AuthAlert"
import { AuthField } from "@/components/auth/AuthField"
import { Icon } from "@/components/ui/Icon"
import { fieldErrorsFromApi } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import { validatePassword } from "@/lib/auth"
import { ic } from "@/lib/constants/icons"

export function ResetPasswordForm() {
  const router = useRouter()
  const { resetPassword } = useAuth()
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{
    password?: string
    confirm?: string
    form?: string
    details?: { path: string; message: string }[]
  }>({})
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("token") ?? ""
    setToken(raw)
    if (!raw) setErrors({ form: "This reset link is missing a token." })
  }, [])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = {
      password: validatePassword(password) ?? undefined,
      confirm: confirm !== password ? "Passwords do not match" : undefined,
      form: token ? undefined : "This reset link is missing a token.",
    }
    setErrors(nextErrors)
    if (nextErrors.password || nextErrors.confirm || nextErrors.form) return

    setPending(true)
    try {
      const message = await resetPassword(token, password)
      router.replace(`/login?notice=${encodeURIComponent(message)}`)
    } catch (error) {
      const parsed = fieldErrorsFromApi(error)
      setErrors({
        form: parsed.form,
        password: parsed.fields.password,
        details: parsed.details,
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {errors.form && <AuthAlert tone="error" message={errors.form} details={errors.details} />}

      <AuthField
        label="New password"
        icon={ic.lock}
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        placeholder="8–72 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 4,
              display: "flex",
            }}
          >
            <Icon d={showPassword ? ic.eyeOff : ic.eye} size={16} color="#8B90A7" />
          </button>
        }
      />
      <AuthField
        label="Confirm password"
        icon={ic.lock}
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        placeholder="Repeat your password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={errors.confirm}
      />

      <button
        type="submit"
        className="btn-primary"
        disabled={pending || !token}
        style={{
          width: "100%",
          padding: "13px 0",
          borderRadius: 16,
          border: "none",
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: pending ? "wait" : "pointer",
          opacity: pending || !token ? 0.75 : 1,
        }}
      >
        {pending ? "Resetting…" : "Reset password"}
      </button>

      <p style={{ margin: "18px 0 0", textAlign: "center", fontSize: 13.5, color: "#8B90A7" }}>
        <Link href="/login" style={{ color: "#5B7CFA", fontWeight: 700, textDecoration: "none" }}>
          Back to sign in
        </Link>
      </p>
    </form>
  )
}
