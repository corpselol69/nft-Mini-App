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
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { t } from "i18next"
import { WithdrawBottomSheet } from "@/components/Modals/WithdrawBottomSheet/WithdrawBottomSheet"
import { SuccessBuyNftBottomSheet } from "@/components/Modals/SuccessBuyNftBottomSheet/SuccessBuyNftBottomSheet"
import { TopUpBottomSheet } from "@/components/Modals/TopUpBottomSheet/TopUpBottomSheet"
import { TransactionGroup } from "@/components/ProfilePage/types"
import { TransactionBlock } from "@/components/ProfilePage/TransactionsBlock/TransactionsBlock"
import { ErrorBottomSheet } from "@/components/Modals/ErrorBottomSheet/ErrorBottomSheet"
import { useAppDispatch } from "@/hooks/useRedux"
import { addSnackbar } from "@/slices/snackbarSlice"
import {
  useLinkWalletMutation,
  useUnlinkWalletMutation,
} from "@/api/endpoints/wallets.ts"
import { setWalletAddress, resetWallet } from "@/slices/walletSlice"

const mockData: TransactionGroup[] = [
  {
    date: "12 ИЮНЯ",
    transactions: [
      {
        id: "1",
        type: "buy",
        description: "Покупка NFT",
        amount: 3.6,
        timestamp: "2023-06-12T14:11:00Z",
      },
      {
        id: "2",
        type: "sell",
        description: "Продажа NFT",
        amount: 10,
        timestamp: "2023-06-12T10:55:00Z",
      },
    ],
  },
  {
    date: "11 ИЮНЯ",
    transactions: [
      {
        id: "3",
        type: "topup",
        description: "Пополнение баланса",
        amount: 15,
        timestamp: "2023-06-11T11:37:00Z",
      },
      {
        id: "4",
        type: "topup",
        description: "Пополнение баланса",
        amount: 15,
        timestamp: "2023-06-11T11:21:00Z",
        status: "failed",
      },
    ],
  },
  {
    date: "10 ИЮНЯ",
    transactions: [
      {
        id: "5",
        type: "bonus",
        description: "Реферальный бонус",
        amount: 0.25,
        timestamp: "2023-06-10T10:57:00Z",
      },
    ],
  },
]

export const ProfilePage: FC = () => {
  const navigate = useNavigate()
  const { openSheet, closeAll } = useBottomSheet()
  const dispatch = useAppDispatch()

  const [walletBalance, setWalletBalance] = useState("")
  const [withdraw, setWithdraw] = useState("")

  const userFriendlyAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()

  const [linkWallet] = useLinkWalletMutation()
  const [unlinkWallet] = useUnlinkWalletMutation()

  const handleReferralClick = () => {
    navigate("ref")
  }

  const handleConnectWallet = async () => {
    tonConnectUI.openModal()

    if (!userFriendlyAddress) return

    try {
      await linkWallet({ address: userFriendlyAddress }).unwrap()
      dispatch(setWalletAddress(userFriendlyAddress))
      setWalletBalance("214") // временно — заменить на значение из API, если есть
    } catch (e) {
      console.error("Ошибка при линке кошелька:", e)
      dispatch(
        addSnackbar({
          title: "Ошибка подключения кошелька",
          autoHide: true,
          duration: 5000,
        })
      )
    }
  }

  const handleDisconnectWallet = async () => {
    try {
      await unlinkWallet().unwrap()
      await tonConnectUI.disconnect()
      dispatch(resetWallet())
      setWalletBalance("")
      closeAll()
    } catch (e) {
      console.error("Ошибка при анлинке кошелька:", e)
      dispatch(
        addSnackbar({
          title: "Ошибка отключения кошелька",
          autoHide: true,
          duration: 5000,
        })
      )
    }
  }

  const handleCopyWallet = () => {
    if (userFriendlyAddress) {
      navigator.clipboard.writeText(userFriendlyAddress)
      dispatch(
        addSnackbar({
          title: "Адрес кошелька скопирован",
          autoHide: true,
          duration: 5000,
        })
      )
    }
  }

  const handleWithdraw = async () => {
    //логика вывода средств
    console.log(`выведено ${withdraw}`)

    try {
      // await api.withdraw()
      openSheet(
        <SuccessBuyNftBottomSheet
          title={"Вывод выполнен"}
          actionButtons={[
            <Button type="primary" size="large" onClick={closeAll}>
              Завершить
            </Button>,
          ]}
        />,
        {
          bottomSheetTitle: `${t("buy_nft")}`,
        }
      )
    } catch (e) {
      console.error(e)
      openSheet(
        <ErrorBottomSheet
          errorTitle={"Ошибка вывода"}
          actionButtons={[
            <Button
              type="secondary"
              size="large"
              onClick={() => console.log("написал в службу поддержки и че?")}
            >
              Написать в службу поддержки
            </Button>,
            <Button
              type="primary"
              size="large"
              onClick={handleOpenWithdrawModal}
            >
              Повторить попытку
            </Button>,
          ]}
          errorText="При выводе средств произошла ошибка. Повторите попытку или обратитесь в службу поддержки."
        />,
        {
          bottomSheetTitle: "Вывод средств",
        }
      )
    }
  }

  const handleTopUp = () => {
    closeAll()
    dispatch(
      addSnackbar({
        title: "Успешное пополнение",
        description: `Баланс пополнен на ${withdraw} TON`,
        autoHide: true,
        duration: 5000,
      })
    )
  }

  const handleInputChange = (v: string) => {
    setWithdraw(v)
  }

  const handleToggleWallet = () => {
    openSheet(
      <Wallet
        address={userFriendlyAddress}
        balance={walletBalance}
        onConnect={handleConnectWallet}
        onCopy={handleCopyWallet}
        isExpanded={true}
      />,
      {
        bottomSheetTitle: `${t("your_wallet")}`,
        buttons: (
          <Button
            size="large"
            onClick={handleDisconnectWallet}
            style={{ marginTop: "24px" }}
          >
            {t("buttons.reconnect_wallet")}
          </Button>
        ),
      }
    )
  }

  const handleOpenWithdrawModal = () => {
    openSheet(
      <WithdrawBottomSheet
        address={userFriendlyAddress}
        availableWithdrawValue="92"
        onChange={handleInputChange}
        withdrawValue={withdraw}
        handleWithdraw={handleWithdraw}
      />,
      {
        bottomSheetTitle: "Вывод средств",
        onClose() {
          setWithdraw("")
        },
      }
    )
  }

  const handleOpenTopUpModal = () => {
    openSheet(
      <TopUpBottomSheet
        address={userFriendlyAddress}
        onChange={handleInputChange}
        withdrawValue={withdraw}
        handleWithdraw={handleTopUp}
      />,
      {
        bottomSheetTitle: t("top_up_balance"),
        onClose() {
          setWithdraw("")
        },
      }
    )
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
            address={userFriendlyAddress}
            balance={walletBalance}
            onConnect={handleConnectWallet}
            onCopy={handleCopyWallet}
            onToggle={handleToggleWallet}
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
          <Button
            type="vertical"
            size="large"
            onClick={() =>
              !!userFriendlyAddress
                ? handleOpenTopUpModal()
                : handleConnectWallet()
            }
          >
            <Icon src={imgAddIcon} className={styles.actionIcon} />
            Пополнить
          </Button>
          <Button
            type="vertical"
            size="large"
            onClick={() =>
              !!userFriendlyAddress
                ? handleOpenWithdrawModal()
                : handleConnectWallet()
            }
          >
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
          {mockData.length ? (
            <TransactionBlock groups={mockData} />
          ) : (
            <div className={styles.historyCard}>
              <span>
                Совершите свою первую
                <br />
                транзакцию
              </span>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </Page>
  )
}
