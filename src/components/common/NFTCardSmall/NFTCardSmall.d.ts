import { NftListItem } from "@/types/market"

export type NFTCardVariant = "cart" | "grid" | "list"
export type NFTCardSize = "s" | "m"

export interface NFTCardSmallProps {
  preview: ReactDOMElement
  title: string
  subtitle?: string

  inStock?: boolean
  isDeleting?: boolean
  selected?: boolean

  price: number
  oldPrice?: number

  editablePrice?: boolean // = true покажет инпут
  onPriceChange?: (next: number) => void

  variant?: NFTCardVariant // влияет на отступы и компоновку
  size?: NFTCardSize // "s" — плотнее, "m" — как на скрине
  showCheckbox?: boolean // показать чекбокс выбора
  deletable?: boolean // показать крестик удаления
  priceTrend?: "up" | "down" // стрелка тренда цены
  currencyIconSrc?: string // иконка токена, по умолчанию TON

  onClick?: () => void
  onRemove?: () => void
  onRestore?: () => void
  onSelect?: (checked: boolean) => void

  endSlot?: React.ReactNode
}
