import { Gift, MediaRole } from "@/types/gift"

/** convert decimal int color (e.g. 8753139) → "#RRGGBB" */
export function intToHexColor(n: number): `#${string}` {
  const clamped = Math.max(0, Math.min(16777215, Math.floor(n)))
  return `#${clamped.toString(16).padStart(6, "0")}` as const
}

/** quick accessors */
export const getMediaByRole = (gift: Gift, role: MediaRole) =>
  gift.medias.find(m => m.role === role)

export const getPreviewImage = (gift: Gift) =>
  getMediaByRole(gift, "PREVIEW")?.asset

export const getBackgroundSvg = (gift: Gift) =>
  getMediaByRole(gift, "BACKGROUND_IMAGE")?.asset

/** example: normalize colors to hex for UI */
export function mapBackgroundColors(gift: Gift) {
  const { center, edge, pattern, text } = gift.background.colors
  return {
    center: intToHexColor(center),
    edge: intToHexColor(edge),
    pattern: intToHexColor(pattern),
    text: intToHexColor(text),
  }
}
