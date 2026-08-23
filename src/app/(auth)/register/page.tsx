import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/AuthShell"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { RequireGuest } from "@/hooks/useAuth"

export const metadata: Metadata = {
  title: "Create account · CloudVault",
  description: "Create a CloudVault account",
}

export default function RegisterPage() {
  return (
    <RequireGuest>
      <AuthShell title="Create your vault" subtitle="A free account gets you started with organized cloud storage.">
        <RegisterForm />
      </AuthShell>
    </RequireGuest>
  )
}
