import { apiRequest } from "@/lib/api/client"
import {
  clearAuthStorage,
  getRefreshToken,
  setAuthSession,
  setStoredUser,
} from "@/lib/api/storage"
import type { AuthResult, AuthUser, TokenPair, UpdateMeInput } from "@/types"

export async function registerRequest(name: string, email: string, password: string): Promise<AuthResult> {
  const result = await apiRequest<AuthResult>("/auth/register", {
    method: "POST",
    json: { name, email, password },
  })
  setAuthSession(result.user, result.accessToken, result.refreshToken)
  return result
}

export async function loginRequest(email: string, password: string): Promise<AuthResult> {
  const result = await apiRequest<AuthResult>("/auth/login", {
    method: "POST",
    json: { email, password },
  })
  setAuthSession(result.user, result.accessToken, result.refreshToken)
  return result
}

export async function logoutRequest(): Promise<void> {
  const refreshToken = getRefreshToken()
  try {
    if (refreshToken) {
      await apiRequest<null>(
        "/auth/logout",
        { method: "POST", json: { refreshToken } },
        { skipAuth: true, skipRefresh: true },
      )
    }
  } finally {
    clearAuthStorage()
  }
}

export async function forgotPasswordRequest(email: string): Promise<string> {
  const data = await apiRequest<{ message: string }>("/auth/forgot-password", {
    method: "POST",
    json: { email },
  })
  return data.message
}

export async function resetPasswordRequest(token: string, password: string): Promise<string> {
  const data = await apiRequest<{ message: string }>("/auth/reset-password", {
    method: "POST",
    json: { token, password },
  })
  clearAuthStorage()
  return data.message
}

export async function getMe(): Promise<AuthUser> {
  const user = await apiRequest<AuthUser>("/me")
  setStoredUser(user)
  return user
}

export async function updateMe(input: UpdateMeInput): Promise<AuthUser> {
  const user = await apiRequest<AuthUser>("/me", {
    method: "PATCH",
    json: input,
  })
  setStoredUser(user)
  return user
}

export async function uploadPhotoRequest(file: File): Promise<AuthUser> {
  const body = new FormData()
  body.append("photo", file)
  const user = await apiRequest<AuthUser>("/me/photo", {
    method: "POST",
    body,
  })
  setStoredUser(user)
  return user
}

export type { TokenPair }
