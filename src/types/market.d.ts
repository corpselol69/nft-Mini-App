import { Gift } from "./gift"

export type AttrType = string

export type MarketSort = price_asc | price_desc | newest

export interface MarketQueryParams {
  offset?: number
  limit?: number
  min_price?: number | string | null
  max_price?: number | string | null
  model_id?: string | null
  seller_id?: string | null
  sort?: MarketSort
  text?: string | null // поиск по модели и атрибутам
  background_name?: string | null
  pattern_name?: string | null
  only_exportable?: boolean
  only_transferable?: boolean
  attr_type?: AttrType[]
  attr_name?: string[]
  attr_min_rarity?: number[]
  attr_max_rarity?: number[]
  attr_backdrop_id?: number[]
}

// Полная схема MarketListingRead не приложена — оставляю «широкий» интерфейс
// + вытаскиваю минимальные поля, нужные для грид-карточек
export interface MarketListingRead {
  id?: string
  title?: string
  price?: number // ожидаемая цена (если другое поле — ниже есть фолбэки)
  transfer_price?: number // иногда цена может быть в этом поле
  gift?: {
    id?: string
    title?: string
    transfer_price?: number
  }
  // ...другие поля по openapi
}

export interface MarketCollectionRead {
  model_id: string
  model_title: string
  model_name: string
  rarity: number
  price_min: string
  price_max: string
  listings_count: number
  last_listed_at: string
  background_names_sample: string[]
  pattern_names_sample: string[]
}

export interface MarketCollectionItemsRead {
  model_id: string
  model_title: string
  model_name: string
  rarity: number
  facets: Facets
  items: MarketItemRead[]
}

export interface MarketItemRead {
  id: string
  price: string
  seller_id: string
  created_at: string
  state: string
  gift: Gift
}

export interface Facets {
  price_min: string
  price_max: string
  rarity_min: number
  rarity_max: number
  backgrounds: string[]
  patterns: string[]
}

export type NftListItem = {
  id: string
  number?: string
  title: string
  price: number
  rarity?: number
  previewEmoji?: string
  preview?: string
  background: string
  locked?: boolean
  isTransferred?: boolean
  canTransferAt?: string
  source: "market" | "profile"
}
