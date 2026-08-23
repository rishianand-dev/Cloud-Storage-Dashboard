"use client"

import type { FileItem, RootFile } from "@/types"
import { Backdrop } from "@/components/ui/Backdrop"
import { ModalCard } from "@/components/ui/ModalCard"
import { FileTypeIcon } from "@/components/ui/FileTypeIcon"
import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function PreviewModal({
  item,
  onClose,
  onShare,
}: {
  item: FileItem | RootFile
  onClose: () => void
  onShare: () => void
}) {
  const isImg = ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(item.ext)
  const isVideo = ["mp4", "mov", "webm"].includes(item.ext)
  const isAudio = ["mp3", "wav", "ogg"].includes(item.ext)

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalCard
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 660,
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: 0,
        }}
      >
        <div
          style={{
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderBottom: "1px solid rgba(163,177,198,0.15)",
            flexShrink: 0,
          }}
        >
          <FileTypeIcon
            icon={item.icon}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
            ext={item.ext}
            size={44}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#1A1D2E",
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.name}.{item.ext}
            </div>
            <div style={{ fontSize: 12, color: "#8B90A7", marginTop: 2 }}>
              {"owner" in item ? `${item.owner} · ` : ""}
              {item.size} · Modified {item.modified}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onShare}
              className="action-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: "#F4F6FA",
                color: "#5B7CFA",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <Icon d={ic.share} size={14} color="#5B7CFA" /> Share
            </button>
            <button
              className="action-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: "#F4F6FA",
                color: "#5A5F7A",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <Icon d={ic.download} size={14} color="#8B90A7" /> Download
            </button>
            <button
              onClick={onClose}
              className="icon-btn"
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
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
        </div>
        <div
          style={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            background: "rgba(244,246,250,0.5)",
          }}
        >
          {isImg ? (
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "12px 12px 28px rgba(163,177,198,0.4), -8px -8px 20px rgba(255,255,255,0.9)",
                overflow: "hidden",
                maxWidth: "100%",
                maxHeight: 400,
              }}
            >
              <div
                style={{
                  width: 500,
                  height: 340,
                  background: "linear-gradient(135deg, #EEF1FF 0%, #F5EEFF 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon d={ic.image} size={80} color="#C4C9DC" strokeWidth={0.8} />
              </div>
            </div>
          ) : isVideo ? (
            <div
              style={{
                background: "#1A1D2E",
                borderRadius: 16,
                overflow: "hidden",
                width: "100%",
                maxHeight: 380,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 340,
                boxShadow: "12px 12px 28px rgba(163,177,198,0.4)",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Icon d={ic.slides} size={28} color="#fff" />
              </div>
            </div>
          ) : isAudio ? (
            <div
              style={{
                background: "#F4F6FA",
                borderRadius: 20,
                padding: 36,
                boxShadow: "10px 10px 24px rgba(163,177,198,0.4), -6px -6px 18px rgba(255,255,255,0.9)",
                textAlign: "center",
                width: "100%",
                maxWidth: 400,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 24,
                  background: "#E8F5FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "6px 6px 14px rgba(14,165,233,0.2)",
                }}
              >
                <Icon d={ic.music} size={36} color="#0EA5E9" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1D2E" }}>{item.name}</div>
              <div style={{ marginTop: 20, height: 4, borderRadius: 4, background: "rgba(163,177,198,0.25)" }}>
                <div
                  style={{
                    width: "38%",
                    height: "100%",
                    background: "linear-gradient(90deg,#5B7CFA,#A855F7)",
                    borderRadius: 4,
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: "#8B90A7" }}>1:24</span>
                <span style={{ fontSize: 11, color: "#8B90A7" }}>3:52</span>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "#F4F6FA",
                borderRadius: 20,
                padding: 40,
                boxShadow: "10px 10px 24px rgba(163,177,198,0.4), -6px -6px 18px rgba(255,255,255,0.9)",
                textAlign: "center",
                width: "100%",
                maxWidth: 400,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 24,
                  background: item.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <Icon d={ic[item.icon] || ic.doc} size={40} color={item.iconColor} strokeWidth={1.4} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1D2E", marginBottom: 8 }}>
                {item.name}.{item.ext}
              </div>
              <div style={{ fontSize: 13, color: "#8B90A7" }}>Preview not available for this file type.</div>
              <button
                className="btn-primary"
                style={{
                  marginTop: 20,
                  padding: "11px 28px",
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Icon d={ic.download} size={15} color="#fff" /> Download to View
              </button>
            </div>
          )}
        </div>
      </ModalCard>
    </>
  )
}
