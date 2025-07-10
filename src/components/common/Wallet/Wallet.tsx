import type { FC } from "react"
import styles from "./Wallet.module.scss"
import type { WalletProps } from "./Wallet.d"
import Icon from "@/components/common/Icon/Icon"
import { Button } from "@/components/common/Button/Button"
import imgWalletIcon from "@/static/icons/wallet.svg"
import imgCopy from "@/static/icons/icn-copy.svg"
import { t } from "i18next"
import imgWalletBigIcon from "@/static/icons/account_balance_wallet.svg"

export const Wallet: FC<WalletProps> = ({
  address,
  balance,

  isExpanded = false,
  onConnect,
  onCopy,
  onToggle,
}) => {
  const formatAddress = (addr: string) => {
    if (addr.length <= 8) return addr
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`
  }

  // Состояние "подключить кошелек"
  if (!address) {
    return (
      <Button type="text" onClick={onConnect}>
        <Icon src={imgWalletIcon} />
        <span>{t("buttons.connect_wallet")}</span>
      </Button>
    )
  }
  // Развернутое состояние (подключен)
  if (isExpanded && address) {
    return (
      <div className={styles.walletExpanded} onClick={onToggle}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <Icon src={imgWalletBigIcon} className={styles.walletIcon} />
            <div className={styles.textContainer}>
              <div className={styles.address}>{formatAddress(address)}</div>
              {balance && (
                <div className={styles.balance}>{balance} TON на балансе</div>
              )}
            </div>
          </div>
          <Button
            type="icon"
            className={styles.copyButton}
            onClick={e => {
              e.stopPropagation()
              onCopy?.()
            }}
          >
            <Icon src={imgCopy} />
          </Button>
        </div>
      </div>
    )
  }

  // Компактное состояние (подключен)
  if (address) {
    return (
      <Button type="text" onClick={onToggle}>
        <Icon src={imgWalletIcon} />
        <span className={styles.addressCompact}>{formatAddress(address)}</span>
      </Button>
    )
  }

  return null
}
