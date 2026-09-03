import { ApiRequestError } from "@/lib/api/errors"
import { getApiBaseUrl } from "@/lib/api/config"
import { clearAuthStorage, getAccessToken, getRefreshToken, setTokens } from "@/lib/api/storage"
import type { ApiError, ApiSuccess, TokenPair } from "@/types"

export const API_BASE_URL = getApiBaseUrl()

const PUBLIC_AUTH_PATHS = new Set([
  "/auth/register",
  "/auth/login",
  "/auth/refresh",
  "/auth/logout",
  "/auth/forgot-password",
  "/auth/reset-password",
])

type RequestFlags = {
  skipAuth?: boolean
  skipRefresh?: boolean
}

type RequestOptions = RequestInit & {
  json?: unknown
}

let refreshInFlight: Promise<void> | null = null
let unauthorizedHandler: (() => void) | null = null

export function setUnauthorizedHandler(handler: (() => void) | null): void {
  unauthorizedHandler = handler
}

function pathname(path: string): string {
  return path.split("?")[0] ?? path
}

function isPublicAuthPath(path: string): boolean {
  return PUBLIC_AUTH_PATHS.has(pathname(path))
}

function forceLocalLogout(): void {
  clearAuthStorage()
  unauthorizedHandler?.()
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export async function refreshSession(): Promise<void> {
  if (refreshInFlight) return refreshInFlight

  refreshInFlight = (async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      throw new ApiRequestError("Invalid refresh token", 401)
    }

    const data = await apiRequest<TokenPair>(
      "/auth/refresh",
      { method: "POST", json: { refreshToken } },
      { skipAuth: true, skipRefresh: true },
    )
    setTokens(data.accessToken, data.refreshToken)
  })().finally(() => {
    refreshInFlight = null
  })

  return refreshInFlight
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
  flags: RequestFlags = {},
): Promise<T> {
  const skipAuth = flags.skipAuth ?? isPublicAuthPath(path)
  const headers = new Headers(options.headers)
  const { json, ...init } = options

  if (json !== undefined) {
    headers.set("Content-Type", "application/json")
  } else if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  if (!skipAuth && !isPublicAuthPath(path)) {
    const accessToken = getAccessToken()
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)
  }

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
      body: json !== undefined ? JSON.stringify(json) : init.body,
    })
  } catch {
    throw new ApiRequestError("Unable to reach the File Storage API", 0)
  }

  if (response.status === 401 && !isPublicAuthPath(path)) {
    if (!flags.skipRefresh) {
      try {
        await refreshSession()
        return apiRequest<T>(path, options, { ...flags, skipRefresh: true })
      } catch (error) {
        forceLocalLogout()
        throw error instanceof ApiRequestError
          ? error
          : new ApiRequestError("Invalid refresh token", 401)
      }
    }
    forceLocalLogout()
  }

  const body = await readJson(response)

  if (!response.ok) {
    const errorBody = body as ApiError | null
    throw new ApiRequestError(
      errorBody?.message || `Request failed (${response.status})`,
      response.status,
      errorBody?.details,
    )
  }

  const success = body as ApiSuccess<T> | null
  if (!success || success.status !== "success") {
    throw new ApiRequestError("Unexpected API response", response.status)
  }

  return success.data
}

export async function apiBlobRequest(
  path: string,
  options: RequestInit = {},
  flags: RequestFlags = {},
): Promise<Blob> {
  const skipAuth = flags.skipAuth ?? isPublicAuthPath(path)
  const headers = new Headers(options.headers)

  if (!skipAuth && !isPublicAuthPath(path)) {
    const accessToken = getAccessToken()
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)
  }

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    })
  } catch {
    throw new ApiRequestError("Unable to reach the File Storage API", 0)
  }

  if (response.status === 401 && !isPublicAuthPath(path)) {
    if (!flags.skipRefresh) {
      try {
        await refreshSession()
        return apiBlobRequest(path, options, { ...flags, skipRefresh: true })
      } catch (error) {
        forceLocalLogout()
        throw error instanceof ApiRequestError
          ? error
          : new ApiRequestError("Invalid refresh token", 401)
      }
    }
    forceLocalLogout()
  }

  if (!response.ok) {
    const body = await readJson(response)
    const errorBody = body as ApiError | null
    throw new ApiRequestError(
      errorBody?.message || `Request failed (${response.status})`,
      response.status,
      errorBody?.details,
    )
  }

  return response.blob()
}
