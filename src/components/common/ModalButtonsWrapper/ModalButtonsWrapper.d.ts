import React from "react"

export interface ModalButtonsWrapperProps {
  variant?: "buy" | "sale" | "remove from sale"
  price: number
  balance: string
  isInCart?: boolean

  onMainClick?: () => void
  onSecondaryClick?: () => void
  onCartClick?: () => void
}
