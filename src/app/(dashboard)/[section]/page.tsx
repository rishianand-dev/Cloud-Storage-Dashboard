import { notFound } from "next/navigation"
import { NAV_IDS, isNavId, type NavId } from "@/types"
import { DashboardShell } from "@/components/layout/DashboardShell"
import { getSectionMeta } from "@/lib/data"

export function generateStaticParams() {
  return NAV_IDS.map((section) => ({ section }))
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  if (!isNavId(section)) return { title: "CloudVault" }
  const meta = getSectionMeta(section)
  return { title: `${meta.title} · CloudVault` }
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  if (!isNavId(section)) notFound()
  return <DashboardShell section={section as NavId} />
}
