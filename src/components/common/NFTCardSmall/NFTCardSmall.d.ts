import { NftListItem } from "@/types/market"

export type NFTCardVariant = "cart" | "grid" | "list"
export type NFTCardSize = "s" | "m"

export interface NFTCardSmallProps {
  checkbox_style?: "default" | "custom"
  preview: ReactDOMElement
  title: string
  subtitle?: string

  inStock?: boolean
  isDeleting?: boolean
  selected?: boolean

  price: number
  oldPrice?: number | null

  editablePrice?: boolean // = true покажет инпут
  onPriceChange?: (next: number) => void

  variant?: NFTCardVariant // влияет на отступы и компоновку
  size?: NFTCardSize // "s" — плотнее, "m" — как на скрине
  showCheckbox?: boolean // показать чекбокс выбора
  deletable?: boolean // показать крестик удаления
  currencyIconSrc?: string // иконка токена, по умолчанию TON

  onClick?: () => void
  onRemove?: () => void
  onRestore?: () => void
  onSelect?: (checked: boolean) => void

  endSlot?: React.ReactNode
}
