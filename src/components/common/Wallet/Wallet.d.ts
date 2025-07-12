export interface WalletProps {
  address?: string
  balance?: string | null
  isExpanded?: boolean
  onConnect?: () => void
  onCopy?: () => void
  onToggle?: () => void
}
