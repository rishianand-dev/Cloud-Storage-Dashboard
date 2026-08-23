"use client"

import { useEffect, useState } from "react"

export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 640)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return {
    isMobile,
    isTablet,
    /** Drawers only on phones; tablets keep docked sidebars with show/hide. */
    hideSidebars: isMobile,
  }
}
