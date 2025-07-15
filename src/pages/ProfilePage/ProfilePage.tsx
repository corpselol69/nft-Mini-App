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
import {
  CHAIN,
  SendTransactionRequest,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { t } from "i18next"
import { WithdrawBottomSheet } from "@/components/Modals/WithdrawBottomSheet/WithdrawBottomSheet"
import { SuccessBuyNftBottomSheet } from "@/components/Modals/SuccessBuyNftBottomSheet/SuccessBuyNftBottomSheet"
import { TopUpBottomSheet } from "@/components/Modals/TopUpBottomSheet/TopUpBottomSheet"
import { TransactionGroup } from "@/components/ProfilePage/types"
import { TransactionBlock } from "@/components/ProfilePage/TransactionsBlock/TransactionsBlock"
import { ErrorBottomSheet } from "@/components/Modals/ErrorBottomSheet/ErrorBottomSheet"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { addSnackbar } from "@/slices/snackbarSlice"
import { useUnlinkWalletMutation } from "@/api/endpoints/wallets.ts"
import { resetWallet } from "@/slices/walletSlice"
import { useTonWalletLinker } from "@/hooks/useTonWalletLinker"
import { useDepositMutation } from "@/api/endpoints/finance"

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

  const [value, setValue] = useState("")

  const user = useAppSelector(state => state.auth.user)

  const userFriendlyAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()

  const [unlinkWallet] = useUnlinkWalletMutation()
  const [topUpBalance] = useDepositMutation()

  const wallet = useAppSelector(state => state.wallet.data)
  const balance = useAppSelector(state => state.finance.balance)

  useTonWalletLinker()

  const handleReferralClick = () => {
    navigate("ref")
  }

  const handleConnectWallet = async () => {
    tonConnectUI.openModal()
  }

  const handleDisconnectWallet = async () => {
    if (!wallet?.id && userFriendlyAddress) {
      // Если кошелек не привязан, просто отключаем TonConnect
      await tonConnectUI.disconnect()
      closeAll()
      handleConnectWallet()
      return
    }
    if (!wallet?.id) return

    try {
      await unlinkWallet({
        wallet_id: wallet.id,
      }).unwrap()
      await tonConnectUI.disconnect()
      dispatch(resetWallet())
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
    console.log(`выведено ${value}`)

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

  const handleTopUp = async (value: string) => {
    const { data } = await topUpBalance({ amount: value })
    const recipient = "UQA5l8_3Db9mQNaXGJXbenNwPpqbXnmMdvg6ewoNSoemT8mu"

    // Сумма в нано-тонах (100000000 = 0.1 TON)
    const amount = "100000000"

    // Время жизни транзакции (например, 5 минут от текущего момента)
    const validUntil = Math.floor(Date.now() / 1000) + 300

    // Payload: строка в hex (обычно это сериализованный BOC или base64)

    const transaction: SendTransactionRequest = {
      validUntil,
      network: CHAIN.MAINNET, // или CHAIN.TESTNET, если тестируете
      messages: [
        {
          address: recipient,
          amount,
          payload: data?.payload, // ⚠️ должен быть либо base64, либо hex, без двоеточий
        },
      ],
    }

    // Отправка запроса пользователю через подключённый кошелёк
    const res = await tonConnectUI.sendTransaction(transaction)
    console.log("Транзакция отправлена:", res)
    closeAll()
    // dispatch(
    //   addSnackbar({
    //     title: "Успешное пополнение",
    //     description: `Баланс пополнен на ${value} TON`,
    //     autoHide: true,
    //     duration: 5000,
    //   })
    // )
  }

  const handleInputChange = (v: string) => {
    setValue(v)
  }

  const handleToggleWallet = () => {
    openSheet(
      <Wallet
        address={userFriendlyAddress}
        balance={balance}
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
        withdrawValue={value}
        handleWithdraw={handleWithdraw}
      />,
      {
        bottomSheetTitle: "Вывод средств",
        onClose() {
          setValue("")
        },
      }
    )
  }

  const handleOpenTopUpModal = () => {
    openSheet(
      <TopUpBottomSheet
        address={userFriendlyAddress}
        withdrawValue={value}
        handleWithdraw={handleTopUp}
      />,
      {
        bottomSheetTitle: t("top_up_balance"),
        onClose() {
          setValue("")
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
            <span className={styles.username}>@{user?.username}</span>
          </div>
          <Wallet
            address={userFriendlyAddress}
            balance={balance}
            onConnect={handleConnectWallet}
            onCopy={handleCopyWallet}
            onToggle={handleToggleWallet}
          />
        </div>

        <div className={styles.balanceBlock}>
          <span className={styles.balanceLabel}>Баланс</span>
          <span className={styles.balanceValue}>
            <span className={styles.balanceAmount}>{balance || 0}</span>
            <span className={styles.balanceCurrency}> TON</span>
          </span>
        </div>

        <div className={styles.actions}>
          <Button
            type="vertical"
            size="large"
            onClick={() => handleOpenTopUpModal()}
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
