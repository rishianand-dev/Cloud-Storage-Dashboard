import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/AuthShell"
import { LoginForm } from "@/components/auth/LoginForm"
import { RequireGuest } from "@/hooks/useAuth"

export const metadata: Metadata = {
  title: "Sign in · CloudVault",
  description: "Sign in to your CloudVault drive",
}

export default function LoginPage() {
  return (
    <RequireGuest>
      <AuthShell title="Welcome back" subtitle="Sign in to open your files, folders, and shared work.">
        <LoginForm />
      </AuthShell>
    </RequireGuest>
  )
}
