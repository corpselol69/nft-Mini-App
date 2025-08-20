// src/types/cart.ts

export interface CartItemRead {
  id: string // uuid item_id
  title?: string
  price?: number // единицы см. по бекенду
  quantity?: number // если поддерживается количество
  gift_id?: string // если добавляем по gift
  listing_id?: string // если добавляем по market listing
  // ...другие поля
}

export interface CartRead {
  id: string
  items: CartItemRead[]
  total_price?: number
  currency?: string
  // ...другие поля
}

export interface CartPreview {
  items?: CartItemRead[]
  total_price?: number
  // ...другие поля предпросмотра
}

export interface CartAddItem {
  // Подставь точные названия полей из `components/schemas/CartAddItem`
  // Например:
  // gift_id?: string;
  // listing_id?: string;
  // quantity?: number;
  [key: string]: unknown
}

export interface CartConfirmIn {
  // Подставь точные поля подтверждения (доставка/самовывоз/адрес/комментарии и т.п.)
  [key: string]: unknown
}

export interface CartConfirmRead {
  // Ответ подтверждения корзины
  cart_id: string
  status?: string
  // ...другие поля
}

export interface OrderRead {
  id: string
  status: string
  // ...другие поля заказа
}
