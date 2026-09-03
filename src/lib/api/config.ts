const LOCAL_API_URL = "http://localhost:3001/api"
const PROD_API_URL = "https://file-storage-seven-neon.vercel.app/api"

function trimBase(url: string): string {
  return url.replace(/\/$/, "")
}

/** Resolves VITE_API_URL or NEXT_PUBLIC_API_URL (Next.js client-safe). */
export function getApiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL
  if (fromEnv?.trim()) return trimBase(fromEnv.trim())
  return trimBase(process.env.NODE_ENV === "production" ? PROD_API_URL : LOCAL_API_URL)
}

export const LOCAL_DEFAULT_API_URL = LOCAL_API_URL
export const PROD_EXAMPLE_API_URL = PROD_API_URL
