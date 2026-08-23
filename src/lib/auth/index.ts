import type { AuthUser, UserAccount } from "@/types"

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function toUserAccount(user: AuthUser): UserAccount {
  return {
    name: user.name,
    email: user.email,
    initials: initialsFromName(user.name),
    image: user.image,
    plan: "Pro Plan",
    storageLabel: "Pro Plan · 25 GB",
    storageUsedGb: 18,
    storageTotalGb: 25,
  }
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Enter your email"
  if (!EMAIL_RE.test(normalizeEmail(email))) return "Invalid email address"
  return null
}

export function validateName(name: string): string | null {
  const trimmed = name.trim()
  if (trimmed.length < 1) return "Name is required"
  if (trimmed.length > 100) return "Name must be at most 100 characters"
  return null
}

export function validatePassword(password: string, requiredOnly = false): string | null {
  if (!password) return "Password is required"
  if (requiredOnly) return null
  if (password.length < 8) return "Password must be at least 8 characters"
  if (password.length > 72) return "Password must be at most 72 characters"
  return null
}

export function validateImageUrl(value: string): string | null {
  if (!value.trim()) return null
  try {
    const url = new URL(value.trim())
    if (url.protocol !== "http:" && url.protocol !== "https:") return "Invalid image URL"
    return null
  } catch {
    return "Invalid image URL"
  }
}
