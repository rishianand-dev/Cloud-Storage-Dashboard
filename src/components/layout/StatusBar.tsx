"use client"

import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function StatusBar({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      style={{
        padding: isMobile ? "10px 16px" : "12px 28px",
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 12 : 24,
        flexWrap: "wrap",
        borderTop: "1px solid rgba(163,177,198,0.2)",
        background: "rgba(244,246,250,0.95)",
        backdropFilter: "blur(10px)",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="status-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981" }} />
        <span style={{ fontSize: 12, color: "#8B90A7", fontWeight: 500 }}>Synced · 2 min ago</span>
      </div>
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon d={ic.wifi} size={14} color="#10B981" />
          <span style={{ fontSize: 12, color: "#8B90A7" }}>Connected</span>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
        <span style={{ fontSize: 12, color: "#8B90A7", fontWeight: 500, whiteSpace: "nowrap" }}>
          Uploading 3 files
        </span>
        <div
          style={{
            flex: 1,
            maxWidth: 160,
            height: 5,
            borderRadius: 5,
            background: "#F4F6FA",
            boxShadow: "inset 3px 3px 7px rgba(163,177,198,0.4), inset -2px -2px 5px rgba(255,255,255,0.8)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "67%",
              height: "100%",
              background: "linear-gradient(90deg,#5B7CFA,#A855F7)",
              borderRadius: 5,
            }}
          />
        </div>
        <span style={{ fontSize: 12, color: "#5B7CFA", fontWeight: 700 }}>67%</span>
      </div>
      {!isMobile && <div style={{ fontSize: 12, color: "#C4C9DC" }}>7 GB free · 18 GB of 25 GB</div>}
    </div>
  )
}
