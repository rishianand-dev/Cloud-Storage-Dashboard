import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/AuthShell"
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"

export const metadata: Metadata = {
  title: "Set new password · CloudVault",
  description: "Choose a new CloudVault password",
}

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Choose a new password" subtitle="Use 8–72 characters. You will need to sign in again after this.">
      <ResetPasswordForm />
    </AuthShell>
  )
}
