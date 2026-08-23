"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  getMe,
  hasStoredTokens,
  hydrateAuthStorage,
  loginRequest,
  logoutRequest,
  registerRequest,
  setUnauthorizedHandler,
  updateMe,
} from "@/lib/api"
import { toUserAccount } from "@/lib/auth"
import { getCurrentUser } from "@/lib/data"
import type { AuthUser, UpdateMeInput, UserAccount } from "@/types"
import { AuthSplash } from "@/components/auth/AuthSplash"

interface AuthContextValue {
  ready: boolean
  user: AuthUser | null
  account: UserAccount
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (input: UpdateMeInput) => Promise<AuthUser>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    hydrateAuthStorage()
    setUnauthorizedHandler(() => {
      setUser(null)
      router.replace("/login")
    })
    return () => setUnauthorizedHandler(null)
  }, [router])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      hydrateAuthStorage()
      if (!hasStoredTokens()) {
        if (!cancelled) {
          setUser(null)
          setReady(true)
        }
        return
      }

      try {
        const me = await getMe()
        if (!cancelled) setUser(me)
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setReady(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginRequest(email, password)
    setUser(result.user)
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const result = await registerRequest(name, email, password)
    setUser(result.user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutRequest()
    } finally {
      setUser(null)
      router.replace("/login")
    }
  }, [router])

  const updateProfile = useCallback(async (input: UpdateMeInput) => {
    const next = await updateMe(input)
    setUser(next)
    return next
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      ready,
      user,
      account: user ? toUserAccount(user) : getCurrentUser(),
      login,
      register,
      logout,
      updateProfile,
    }),
    [ready, user, login, register, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { ready, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (ready && !user) {
      const login = new URL("/login", window.location.origin)
      if (pathname && pathname !== "/") login.searchParams.set("from", pathname)
      router.replace(`${login.pathname}${login.search}`)
    }
  }, [ready, user, router, pathname])

  if (!ready || !user) return <AuthSplash />
  return children
}

export function RequireGuest({ children }: { children: ReactNode }) {
  const { ready, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (ready && user) router.replace("/drive")
  }, [ready, user, router])

  if (ready && user) return <AuthSplash />
  return children
}
