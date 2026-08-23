"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthAlert } from "@/components/auth/AuthAlert"
import { AuthField } from "@/components/auth/AuthField"
import { Icon } from "@/components/ui/Icon"
import { useAuth } from "@/hooks/useAuth"
import { fieldErrorsFromApi } from "@/lib/api"
import { validateEmail, validatePassword } from "@/lib/auth"
import { ic } from "@/lib/constants/icons"

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    form?: string
    details?: { path: string; message: string }[]
  }>({})
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setNotice(params.get("notice"))
  }, [])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = {
      email: validateEmail(email) ?? undefined,
      password: validatePassword(password, true) ?? undefined,
    }
    setErrors(nextErrors)
    if (nextErrors.email || nextErrors.password) return

    setPending(true)
    try {
      await login(email, password)
      const from = new URLSearchParams(window.location.search).get("from")
      const next =
        from &&
        from.startsWith("/") &&
        !from.startsWith("//") &&
        !from.startsWith("/login") &&
        !from.startsWith("/register") &&
        !from.startsWith("/forgot-password") &&
        !from.startsWith("/reset-password")
          ? from
          : "/drive"
      router.replace(next)
    } catch (error) {
      const parsed = fieldErrorsFromApi(error)
      setErrors({
        form: parsed.form,
        email: parsed.fields.email,
        password: parsed.fields.password,
        details: parsed.details,
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {notice && <AuthAlert tone="success" message={notice} />}
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
      <AuthField
        label="Password"
        icon={ic.lock}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        placeholder="Enter your password"
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

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 22 }}>
        <Link href="/forgot-password" style={{ fontSize: 12.5, color: "#5B7CFA", fontWeight: 700, textDecoration: "none" }}>
          Forgot password?
        </Link>
      </div>

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
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <p style={{ margin: "18px 0 0", textAlign: "center", fontSize: 13.5, color: "#8B90A7" }}>
        New to CloudVault?{" "}
        <Link href="/register" style={{ color: "#5B7CFA", fontWeight: 700, textDecoration: "none" }}>
          Create an account
        </Link>
      </p>
    </form>
  )
}
