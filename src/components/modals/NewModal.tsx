"use client"

import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function NewModal({
  onClose,
  onNewFolder,
  onUpload,
}: {
  onClose: () => void
  onNewFolder: () => void
  onUpload: () => void
}) {
  const items = [
    { icon: "folder", label: "New Folder", desc: "Create an empty folder", color: "#5B7CFA", bg: "#EEF1FF", action: () => { onClose(); onNewFolder() } },
    { icon: "upload", label: "Upload File", desc: "Upload from your device", color: "#10B981", bg: "#EEFAF5", action: () => { onClose(); onUpload() } },
    { icon: "inbox", label: "Upload Folder", desc: "Upload an entire folder", color: "#0EA5E9", bg: "#E8F5FF", action: () => { onClose(); onUpload() } },
    { icon: "doc", label: "New Document", desc: "Create a blank doc", color: "#5B7CFA", bg: "#EEF1FF", action: onClose },
    { icon: "sheet", label: "New Spreadsheet", desc: "Create a blank spreadsheet", color: "#10B981", bg: "#EEFAF5", action: onClose },
    { icon: "slides", label: "New Presentation", desc: "Create a blank presentation", color: "#FF6B35", bg: "#FFF3E0", action: onClose },
  ]
  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalCard style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 420, padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#1A1D2E", letterSpacing: "-0.3px" }}>Create New</div>
          <button onClick={onClose} className="icon-btn" style={{ width: 34, height: 34, borderRadius: 10, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6FA" }}><Icon d={ic.x} size={16} color="#8B90A7"/></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map(item => (
            <button key={item.label} onClick={item.action} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 14, border: "none", cursor: "pointer", background: "#F4F6FA", boxShadow: "6px 6px 14px rgba(163,177,198,0.35), -4px -4px 10px rgba(255,255,255,0.85)", textAlign: "left", transition: "all 0.2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `3px 3px 8px ${item.color}20` }}>
                <Icon d={ic[item.icon]} size={18} color={item.color} strokeWidth={1.8}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "#8B90A7", marginTop: 2 }}>{item.desc}</div>
              </div>
              <Icon d={ic.chevRight} size={16} color="#C4C9DC"/>
            </button>
          ))}
        </div>
      </ModalCard>
    </>
  )
}
