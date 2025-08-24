export type UUID = string

export type MoneyString = string

export interface CartAddItem {
  listing_id: UUID
}

export interface CartConfirmIn {
  /** Подтвердить все изменения без уточнений */
  accept_all?: boolean
  /** Явно подтверждаемые позиции (если не accept_all) */
  item_ids?: string[] | null
  /** Автоматически удалить отсутствующие товары */
  remove_unavailable?: boolean
}

type OrderState = "draft" | "paid" | "expired"

type CartItem = {
  id: string
  listing_id: string
  snapshot_price: string
  // ...возможны доп. поля
}

export interface OrderItem {
  id?: UUID
  listing_id?: UUID
  [k: string]: unknown
}

type CartRead = {
  id: string
  buyer_id: string
  state: OrderState
  total: string
  paid_at: string | null
  items: CartItem[]
}

export interface OrderRead {
  id: UUID
  state: OrderState
  total: MoneyString
  paid_at: string | null
  items: OrderItem[]
}

/** ===================== DIFFS / PREVIEW ===================== **/

export type DiffKind = "unavailable" | "price_changed" // например: "price_changed" | "not_available" | ...

export interface CartDiff {
  kind: DiffKind
  item_id: string
  old_price: string
  new_price: string
}

export interface CartPreview {
  order: OrderRead
  diffs: CartDiff[]
}

/** ===================== CONFIRM RESULT ===================== **/

// В контракте не видел, как возвращается confirm; беру тот же формат, что у preview.
// Если у тебя иначе — просто поправь на нужный тип.
export interface CartConfirmRead {
  order: OrderRead
  diffs: CartDiff[]
}
