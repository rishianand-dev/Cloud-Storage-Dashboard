"use client"

import { useEffect, useState } from "react"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function UploadModal({ onClose }: { onClose: () => void }) {
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<{ name: string; size: string; progress: number; color: string }[]>([
    { name: "presentation_final.pptx", size: "18.7 MB", progress: 100, color: "#FF6B35" },
    { name: "brand_kit_2025.fig", size: "38 MB", progress: 72, color: "#A855F7" },
    { name: "team_photo_hires.png", size: "4.7 MB", progress: 45, color: "#10B981" },
  ])

  useEffect(() => {
    const t = setInterval(() => {
      setFiles((prev) => prev.map((f) => ({ ...f, progress: Math.min(100, f.progress + Math.random() * 8) })))
    }, 500)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalCard style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 480, padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#1A1D2E" }}>Upload Files</div>
          <button
            onClick={onClose}
            className="icon-btn"
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F4F6FA",
            }}
          >
            <Icon d={ic.x} size={16} color="#8B90A7" />
          </button>
        </div>
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={() => setDragging(false)}
          style={{
            border: `2px dashed ${dragging ? "#5B7CFA" : "rgba(163,177,198,0.5)"}`,
            borderRadius: 18,
            padding: "32px 24px",
            textAlign: "center",
            transition: "all 0.2s ease",
            background: dragging ? "rgba(91,124,250,0.04)" : "rgba(255,255,255,0.4)",
            marginBottom: 20,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: "#EEF1FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
              boxShadow: "4px 4px 10px rgba(91,124,250,0.2), -3px -3px 8px rgba(255,255,255,0.8)",
            }}
          >
            <Icon d={ic.upload} size={26} color="#5B7CFA" strokeWidth={1.8} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E", marginBottom: 6 }}>Drop files here</div>
          <div style={{ fontSize: 13, color: "#8B90A7" }}>
            or <span style={{ color: "#5B7CFA", fontWeight: 600, cursor: "pointer" }}>browse from your device</span>
          </div>
          <div style={{ fontSize: 11.5, color: "#C4C9DC", marginTop: 8 }}>Max file size: 5 GB per file</div>
        </div>
        {files.length > 0 && (
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1A1D2E", marginBottom: 12 }}>
              Uploading {files.length} files
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {files.map((f) => (
                <div
                  key={f.name}
                  style={{
                    background: "#F4F6FA",
                    borderRadius: 14,
                    padding: "12px 14px",
                    boxShadow: "4px 4px 10px rgba(163,177,198,0.3), -3px -3px 8px rgba(255,255,255,0.8)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 9,
                          background: `${f.color}18`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon d={ic.doc} size={14} color={f.color} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: "#1A1D2E",
                            maxWidth: 240,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {f.name}
                        </div>
                        <div style={{ fontSize: 11, color: "#8B90A7" }}>{f.size}</div>
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: f.progress === 100 ? "#10B981" : "#5B7CFA",
                      }}
                    >
                      {Math.round(f.progress)}%
                    </div>
                  </div>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 4,
                      background: "rgba(163,177,198,0.25)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${f.progress}%`,
                        height: "100%",
                        background:
                          f.progress === 100
                            ? "linear-gradient(90deg,#10B981,#34D399)"
                            : "linear-gradient(90deg,#5B7CFA,#A855F7)",
                        borderRadius: 4,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ModalCard>
    </>
  )
}
