import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/AuthShell"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Forgot password · CloudVault",
  description: "Reset your CloudVault password",
}

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we will send a reset link if an account exists."
    >
      <ForgotPasswordForm />
    </AuthShell>
  )
}
