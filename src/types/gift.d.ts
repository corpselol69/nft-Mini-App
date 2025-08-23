export type AssetKind = "IMAGE" | "ANIMATION"
export type MediaRole =
  | "PREVIEW"
  | "MODEL_DOC"
  | "STICKER_DOC"
  | "SYMBOL_DOC"
  | "BACKGROUND_IMAGE"

export interface GiftModel {
  collectible_id: number
  title: string
  name: string
  base_rarity: number
}

export interface GiftBackgroundColors {
  center: number
  edge: number
  pattern: number
  text: number
}

export interface GiftBackground {
  name: string
  rarity: number
  colors: GiftBackgroundColors
}

export interface GiftPattern {
  name: string
  rarity: number
}

export interface GiftAsset {
  id: string
  kind: AssetKind
  url: string
  mime_type: string
  width: number
  height: number
  duration_ms: number | null
  is_video: boolean
  is_animated: boolean
}

export interface GiftMedia {
  role: MediaRole
  asset: GiftAsset
}

export interface GiftVariant {
  name: string
  rarity: number
}

export interface Gift {
  id: string
  number: number
  total_amount: number
  tg_gift_id: string
  price: number
  locked: boolean

  model: GiftModel //будет коллекцией
  background: GiftBackground
  pattern: GiftPattern
  variant: GiftVariant //будет моделью
  medias: GiftMedia[]

  background_url: string
  preview_url: string
  animation_url: string
}
