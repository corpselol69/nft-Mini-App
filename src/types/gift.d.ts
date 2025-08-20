export interface GiftAttribute {
  trait_type: string
  value: string | number | boolean
}

export interface GiftRead {
  id: string
  tg_gift_id: number
  number: number
  title: string
  rarity: number
  transfer_price: number
  locked: boolean
  can_transfer_at: string
  is_transferred: boolean
  storage_chat_id: number
  attributes: GiftAttribute[]
}

export interface GiftWebhookIn {
  [key: string]: unknown
}
