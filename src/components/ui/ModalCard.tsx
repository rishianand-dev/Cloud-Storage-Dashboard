"use client"

import type { CSSProperties, ReactNode } from "react"

export function ModalCard({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 101,
        background: "linear-gradient(160deg, #F7F9FD 0%, #F0F3FA 100%)",
        borderRadius: 24,
        boxShadow:
          "20px 20px 60px rgba(163,177,198,0.7), -12px -12px 30px rgba(255,255,255,0.95), 0 0 0 1px rgba(255,255,255,0.6)",
        animation: "floatIn 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        ...style,
      }}
    >
      {children}
    </div>
  )
}
