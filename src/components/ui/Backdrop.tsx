"use client"

export function Backdrop({ onClick, blur = true }: { onClick: () => void; blur?: boolean }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        inset: 0,
        background: blur ? "rgba(26,29,46,0.35)" : "transparent",
        backdropFilter: blur ? "blur(4px)" : undefined,
        WebkitBackdropFilter: blur ? "blur(4px)" : undefined,
        zIndex: 100,
        animation: "fadeIn 0.18s ease",
      }}
    />
  )
}
