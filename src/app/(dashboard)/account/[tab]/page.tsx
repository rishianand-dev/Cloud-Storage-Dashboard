import { notFound } from "next/navigation"
import { ACCOUNT_TAB_IDS, isAccountTabId, type AccountTabId } from "@/types"
import { DashboardShell } from "@/components/layout/DashboardShell"
import { AccountView } from "@/components/account/AccountView"
import { getAccountMenuItem } from "@/lib/data"

export function generateStaticParams() {
  return ACCOUNT_TAB_IDS.map((tab) => ({ tab }))
}

export async function generateMetadata({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params
  if (!isAccountTabId(tab)) return { title: "Account · CloudVault" }
  const item = getAccountMenuItem(tab)
  return { title: `${item.label} · CloudVault` }
}

export default async function AccountTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params
  if (!isAccountTabId(tab)) notFound()

  return (
    <DashboardShell>
      <AccountView tab={tab as AccountTabId} />
    </DashboardShell>
  )
}
