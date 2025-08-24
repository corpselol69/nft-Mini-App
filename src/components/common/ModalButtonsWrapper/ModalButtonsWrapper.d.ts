import React from "react"

export interface ModalButtonsWrapperProps {
  variant?: "buy" | "sell" | "withdraw"
  price: string
  balance: string
  isInCart?: boolean

  onMainClick?: () => void
  onSecondaryClick?: () => void
  onCartClick?: () => void
}
