/** Relative / display date strings → higher = more recent */
export function modifiedRank(value: string): number {
  const v = value.trim().toLowerCase()
  if (v === "just now") return 1_000_000
  if (v.includes("min")) {
    const n = parseInt(v, 10)
    return 900_000 - (Number.isFinite(n) ? n : 0)
  }
  if (v.includes("h ago") || v.endsWith("h ago")) {
    const n = parseInt(v, 10)
    return 800_000 - (Number.isFinite(n) ? n * 60 : 0)
  }
  if (v === "today") return 700_000
  if (v === "yesterday") return 600_000
  if (v.includes("day")) {
    const n = parseInt(v, 10)
    return 500_000 - (Number.isFinite(n) ? n * 1000 : 0)
  }
  if (v.includes("week")) {
    const n = parseInt(v, 10) || 1
    return 400_000 - n * 7000
  }
  if (v.includes("month")) {
    const n = parseInt(v, 10) || 1
    return 300_000 - n * 30_000
  }
  // Absolute-ish labels like "Jan 30", "Dec 2024"
  const months: Record<string, number> = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  }
  const parts = v.replace(",", "").split(/\s+/)
  const month = months[parts[0]?.slice(0, 3)]
  if (month) {
    const dayOrYear = parseInt(parts[1] ?? "1", 10) || 1
    if (dayOrYear > 31) return dayOrYear * 100 + month
    return 2025 * 10000 + month * 100 + dayOrYear
  }
  return 0
}

export function sizeToBytes(value: string): number {
  const match = value.trim().match(/^([\d.]+)\s*(b|kb|mb|gb|tb)?$/i)
  if (!match) return 0
  const n = parseFloat(match[1])
  const unit = (match[2] || "b").toLowerCase()
  const mult =
    unit === "tb" ? 1024 ** 4 : unit === "gb" ? 1024 ** 3 : unit === "mb" ? 1024 ** 2 : unit === "kb" ? 1024 : 1
  return n * mult
}

export function compareSortValues(a: string | number, b: string | number, ascending: boolean): number {
  const dir = ascending ? 1 : -1
  if (typeof a === "number" && typeof b === "number") return (a - b) * dir
  return String(a).localeCompare(String(b), undefined, { sensitivity: "base", numeric: true }) * dir
}
