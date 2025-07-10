export interface WalletProps {
  address?: string
  balance?: string
  isExpanded?: boolean
  onConnect?: () => void
  onCopy?: () => void
  onToggle?: () => void
}
