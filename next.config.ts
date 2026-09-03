import type { NextConfig } from "next"

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  process.env.VITE_API_URL?.trim() ||
  "http://localhost:3001/api"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    VITE_API_URL: apiUrl,
    NEXT_PUBLIC_API_URL: apiUrl,
  },
}

export default nextConfig
