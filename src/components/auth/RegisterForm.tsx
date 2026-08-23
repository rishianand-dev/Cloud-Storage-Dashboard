"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthAlert } from "@/components/auth/AuthAlert"
import { AuthField } from "@/components/auth/AuthField"
import { Icon } from "@/components/ui/Icon"
import { useAuth } from "@/hooks/useAuth"
import { fieldErrorsFromApi } from "@/lib/api"
import { validateEmail, validateName, validatePassword } from "@/lib/auth"
import { ic } from "@/lib/constants/icons"

export function RegisterForm() {
  const { register } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirm?: string
    form?: string
    details?: { path: string; message: string }[]
  }>({})
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = {
      name: validateName(name) ?? undefined,
      email: validateEmail(email) ?? undefined,
      password: validatePassword(password) ?? undefined,
      confirm: confirm !== password ? "Passwords do not match" : undefined,
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.email || nextErrors.password || nextErrors.confirm) return

    setPending(true)
    try {
      await register(name, email, password)
      router.replace("/drive")
    } catch (error) {
      const parsed = fieldErrorsFromApi(error)
      setErrors({
        form: parsed.form,
        name: parsed.fields.name,
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
      {errors.form && <AuthAlert tone="error" message={errors.form} details={errors.details} />}

      <AuthField
        label="Full name"
        icon={ic.user}
        type="text"
        autoComplete="name"
        placeholder="Alex Rivera"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
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
        disabled={pending}
        style={{
          width: "100%",
          marginTop: 6,
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
        {pending ? "Creating account…" : "Create account"}
      </button>

      <p style={{ margin: "18px 0 0", textAlign: "center", fontSize: 13.5, color: "#8B90A7" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#5B7CFA", fontWeight: 700, textDecoration: "none" }}>
          Sign in
        </Link>
      </p>
    </form>
  )
}
