import { UserAvatar } from "@/components/ui/UserAvatar"
import type { UserAccount } from "@/types"

export function AccountUserHeader({ user }: { user: UserAccount }) {
  return (
    <div
      style={{
        padding: "20px 20px 16px",
        background: "linear-gradient(135deg, rgba(91,124,250,0.08), rgba(168,85,247,0.06))",
        borderBottom: "1px solid rgba(163,177,198,0.15)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <UserAvatar name={user.name} initials={user.initials} image={user.image} size={48} radius={16} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1D2E" }}>{user.name}</div>
          <div
            style={{
              fontSize: 12,
              color: "#8B90A7",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user.email}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
            <span style={{ fontSize: 11, color: "#10B981", fontWeight: 600 }}>{user.storageLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
