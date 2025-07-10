import type { FC } from "react"
import { useState } from "react"
import { Page } from "@/components/Page.tsx"
import styles from "./ProfilePage.module.scss"
import Icon from "@/components/common/Icon/Icon"
import { Button } from "@/components/common/Button/Button"
import { Wallet } from "@/components/common/Wallet"
import imgAddIcon from "@/static/icons/icn-add.svg"
import imgArrowUp from "@/static/icons/arrow-up.svg"
import imgDiversity from "@/static/icons/diversity.svg"
import imgChevronForward from "@/static/icons/chevron_forward.svg"
import { Outlet, useNavigate } from "react-router-dom"
import { Avatar } from "@/components/common/Avatar/Avatar.tsx"
import { useTonConnectUI } from "@tonconnect/ui-react"

export const ProfilePage: FC = () => {
  const navigate = useNavigate()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [walletBalance, setWalletBalance] = useState("")

  const [tonConnectUI] = useTonConnectUI()

  const handleReferralClick = () => {
    navigate("ref")
  }

  const handleConnectWallet = () => {
    // Симуляция подключения кошелька
    tonConnectUI.openModal()
    setIsWalletConnected(true)
    setWalletAddress("UQD6naYvQrlcfsaAbDOFgBiNRRlLckIxdUEhd0aGF1pKo6Q")
    setWalletBalance("214")
  }

  const handleCopyWallet = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      //  добавить уведомление о копировании
    }
  }

  return (
    <Page back={false}>
      <div className={styles.profilePage}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <Avatar />
            <span className={styles.username}>@username</span>
          </div>
          <Wallet
            address={walletAddress}
            balance={walletBalance}
            isConnected={isWalletConnected}
            onConnect={handleConnectWallet}
            onCopy={handleCopyWallet}
          />
        </div>

        <div className={styles.balanceBlock}>
          <span className={styles.balanceLabel}>Баланс</span>
          <span className={styles.balanceValue}>
            <span className={styles.balanceAmount}>0</span>
            <span className={styles.balanceCurrency}> TON</span>
          </span>
        </div>

        <div className={styles.actions}>
          <Button type="vertical" size="large">
            <Icon src={imgAddIcon} className={styles.actionIcon} />
            Пополнить
          </Button>
          <Button type="vertical" size="large">
            <Icon src={imgArrowUp} className={styles.actionIcon} />
            Вывести
          </Button>
        </div>

        <div className={styles.referralBlock} onClick={handleReferralClick}>
          <span className={styles.referralLabel}>реферальная система</span>
          <div className={styles.referralCard}>
            <Icon src={imgDiversity} className={styles.actionIcon} />
            <span>Заработать на приглашениях</span>
            <Icon src={imgChevronForward} className={styles.chevron} />
          </div>
        </div>

        <div className={styles.historyBlock}>
          <span className={styles.historyLabel}>История транзакций</span>
          <div className={styles.historyCard}>
            <span>
              Совершите свою первую
              <br />
              транзакцию
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </Page>
  )
}
