"use client"

import type { RefObject } from "react"
import { useRouter } from "next/navigation"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { AccountUserHeader } from "@/components/account/AccountUserHeader"
import { AccountMenuItemButton, AccountSignOutButton } from "@/components/account/AccountMenuItem"
import { getAccountMenuItems } from "@/lib/data"
import { useAuth } from "@/hooks/useAuth"

export function ProfileModal({
  onClose,
  anchorRef,
}: {
  onClose: () => void
  anchorRef: RefObject<HTMLDivElement | null>
}) {
  const router = useRouter()
  const rect = anchorRef.current?.getBoundingClientRect()
  const top = rect ? rect.bottom + 10 : 80
  const right = rect ? window.innerWidth - rect.right : 16
  const { account: user } = useAuth()
  const menuItems = getAccountMenuItems()

  return (
    <>
      <Backdrop onClick={onClose} blur={false} />
      <ModalCard style={{ top, right, width: 280, padding: 0, overflow: "hidden" }}>
        <div
          onClick={() => {
            onClose()
            router.push("/account/profile")
          }}
          style={{ cursor: "pointer" }}
        >
          <AccountUserHeader user={user} />
        </div>
        <div style={{ padding: "10px 8px" }}>
          {menuItems.map((item) => (
            <AccountMenuItemButton key={item.id} item={item} onClick={onClose} />
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(163,177,198,0.15)", padding: "10px 8px" }}>
          <AccountSignOutButton onClick={onClose} />
        </div>
      </ModalCard>
    </>
  )
}
