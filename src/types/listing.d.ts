export interface ListingCreate {
  gift_id: string
  price: number | string
}

export interface ListingUpdate {
  price: number | string
}

export type ListingState = string // если есть enum в схемах

export interface ListingRead {
  id: string
  gift_id: string
  price: string
  state: ListingState
  created_at: string
  locked_by_order_id: string | null
  locked_until: string | null
}
