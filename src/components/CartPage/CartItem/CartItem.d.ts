import type { CartItem as CartItemType } from "../../../slices/cartSlice"

export interface CartItemProps {
  item: CartItemType
  onRemove: () => void
  onSelect: (checked: boolean) => void
  isDeleting: boolean
  onRestore: () => void
}
