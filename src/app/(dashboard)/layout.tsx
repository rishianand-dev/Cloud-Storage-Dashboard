"use client"

import type { ReactNode } from "react"
import { RequireAuth } from "@/hooks/useAuth"
import { DashboardProvider } from "@/hooks/useDashboard"
import { FoldersProvider } from "@/hooks/useFolders"
import { FilesProvider } from "@/hooks/useFiles"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <FoldersProvider>
        <FilesProvider>
          <DashboardProvider>{children}</DashboardProvider>
        </FilesProvider>
      </FoldersProvider>
    </RequireAuth>
  )
}
