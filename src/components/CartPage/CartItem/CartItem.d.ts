import type { CartItem as CartItemType } from "../../../slices/cartSlice"

export interface CartItemProps {
  item: {
    id: string
    title: string
    number: string
    price: number
    preview: string
    background?: string
    selected?: boolean
    inStock?: boolean
    oldPrice?: number
  }
  onRemove: () => void
  onSelect: (checked: boolean) => void
  isDeleting: boolean
  onRestore: () => void
}
