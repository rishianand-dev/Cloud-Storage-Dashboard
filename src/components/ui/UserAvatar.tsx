"use client"

import { useEffect, useState } from "react"

export function UserAvatar({
  name,
  initials,
  image,
  size = 42,
  radius,
}: {
  name: string
  initials: string
  image?: string | null
  size?: number
  radius?: number
}) {
  const [failed, setFailed] = useState(false)
  const borderRadius = radius ?? Math.round(size * 0.31)

  useEffect(() => {
    setFailed(false)
  }, [image])

  const showImage = Boolean(image) && !failed

  if (showImage) {
    return (
      <img
        src={image!}
        alt={name}
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          borderRadius,
          objectFit: "cover",
          flexShrink: 0,
          boxShadow: "4px 4px 12px rgba(91,124,250,0.28)",
        }}
      />
    )
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius,
        background: "linear-gradient(135deg, #5B7CFA, #A855F7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: Math.max(11, Math.round(size * 0.32)),
        fontWeight: 800,
        flexShrink: 0,
        boxShadow: "4px 4px 12px rgba(91,124,250,0.35)",
      }}
    >
      {initials}
    </div>
  )
}
