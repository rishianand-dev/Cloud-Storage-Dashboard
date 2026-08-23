"use client"

import type { ReactNode } from "react"
import { RequireAuth } from "@/hooks/useAuth"
import { DashboardProvider } from "@/hooks/useDashboard"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <DashboardProvider>{children}</DashboardProvider>
    </RequireAuth>
  )
}
