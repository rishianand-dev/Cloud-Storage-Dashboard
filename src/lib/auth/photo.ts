export const PROFILE_PHOTO_MAX_BYTES = 5 * 1024 * 1024

export const PROFILE_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
])

const PROFILE_PHOTO_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])

export function validateProfilePhoto(file: File): string | null {
  const ext = file.name.includes(".") ? `.${file.name.split(".").pop()!.toLowerCase()}` : ""
  const typeOk = PROFILE_PHOTO_TYPES.has(file.type.toLowerCase()) || PROFILE_PHOTO_EXTENSIONS.has(ext)
  if (!typeOk) return "Only JPEG, PNG, WebP, and GIF images are allowed"
  if (file.size > PROFILE_PHOTO_MAX_BYTES) return "Photo must be 5 MB or smaller"
  if (file.size < 1) return "Photo is required"
  return null
}

export function profilePhotoSrc(image: string | null | undefined, cacheKey?: number): string | null {
  if (!image) return null
  try {
    const url = new URL(image)
    if (cacheKey) url.searchParams.set("v", String(cacheKey))
    return url.toString()
  } catch {
    return image
  }
}
