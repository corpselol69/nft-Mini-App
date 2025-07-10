export interface WalletProps {
  address?: string;
  balance?: string;
  isConnected?: boolean;
  isExpanded?: boolean;
  onConnect?: () => void;
  onCopy?: () => void;
  onToggle?: () => void;
}
