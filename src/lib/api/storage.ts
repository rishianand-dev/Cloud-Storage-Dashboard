import type { AuthUser } from "@/types"

const ACCESS_KEY = "cloudvault.accessToken"
const REFRESH_KEY = "cloudvault.refreshToken"
const USER_KEY = "cloudvault.user"

let accessToken: string | null = null
let refreshToken: string | null = null
let user: AuthUser | null = null
let hydrated = false

function canUseStorage(): boolean {
  return typeof window !== "undefined"
}

export function hydrateAuthStorage(): void {
  if (hydrated || !canUseStorage()) return
  accessToken = window.localStorage.getItem(ACCESS_KEY)
  refreshToken = window.localStorage.getItem(REFRESH_KEY)
  try {
    const raw = window.localStorage.getItem(USER_KEY)
    user = raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    user = null
  }
  hydrated = true
}

export function getAccessToken(): string | null {
  hydrateAuthStorage()
  return accessToken
}

export function getRefreshToken(): string | null {
  hydrateAuthStorage()
  return refreshToken
}

export function getStoredUser(): AuthUser | null {
  hydrateAuthStorage()
  return user
}

export function setTokens(nextAccess: string, nextRefresh: string): void {
  accessToken = nextAccess
  refreshToken = nextRefresh
  if (!canUseStorage()) return
  window.localStorage.setItem(ACCESS_KEY, nextAccess)
  window.localStorage.setItem(REFRESH_KEY, nextRefresh)
}

export function setStoredUser(next: AuthUser | null): void {
  user = next
  if (!canUseStorage()) return
  if (next) window.localStorage.setItem(USER_KEY, JSON.stringify(next))
  else window.localStorage.removeItem(USER_KEY)
}

export function setAuthSession(nextUser: AuthUser, nextAccess: string, nextRefresh: string): void {
  setTokens(nextAccess, nextRefresh)
  setStoredUser(nextUser)
}

export function clearAuthStorage(): void {
  accessToken = null
  refreshToken = null
  user = null
  if (!canUseStorage()) return
  window.localStorage.removeItem(ACCESS_KEY)
  window.localStorage.removeItem(REFRESH_KEY)
  window.localStorage.removeItem(USER_KEY)
}

export function hasStoredTokens(): boolean {
  return Boolean(getAccessToken() || getRefreshToken())
}
