import type { FC } from "react"
import { useMemo, useState } from "react"
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
import { SuccessBottomSheet } from "@/components/Modals/SuccessBottomSheet/SuccessBottomSheet"
import { TopUpBottomSheet } from "@/components/Modals/TopUpBottomSheet/TopUpBottomSheet"

import { TransactionBlock } from "@/components/common/Transactions/TransactionsBlock/TransactionsBlock"
import { ErrorBottomSheet } from "@/components/Modals/ErrorBottomSheet/ErrorBottomSheet"
import { useAppDispatch } from "@/hooks/useRedux"
import { addSnackbar } from "@/slices/snackbarSlice"
import {
  useGetWalletQuery,
  useUnlinkWalletMutation,
} from "@/api/endpoints/wallets.ts"
import { useTonWalletLinker } from "@/hooks/useTonWalletLinker"
import {
  useDepositMutation,
  useGetBalanceQuery,
  useWithdrawMutation,
} from "@/api/endpoints/finance"
import formatAmount from "@/helpers/formatAmount"
import { retrieveLaunchParams } from "@telegram-apps/bridge"
import { openTelegramLink } from "@telegram-apps/sdk"
import { useGetMeQuery } from "@/api/endpoints/users"

export const ProfilePage: FC = () => {
  const navigate = useNavigate()
  const { openSheet, closeAll, closeSheet } = useBottomSheet()
  const dispatch = useAppDispatch()

  const [value, setValue] = useState("")

  const { data: user, isLoading: _userLoading } = useGetMeQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const { data: wallets, isLoading: _isWalletLoading } = useGetWalletQuery()
  const wallet = useMemo(() => wallets?.[0], [wallets])

  const { data: balance, isLoading: _isBalLoading } = useGetBalanceQuery(
    undefined,
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      // pollingInterval: 10_000,
    }
  )

  const userFriendlyAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()

  const [unlinkWallet] = useUnlinkWalletMutation()
  const [topUpBalance] = useDepositMutation()
  const [withdrawBalance] = useWithdrawMutation()

  const { tgWebAppData } = retrieveLaunchParams()
  const avatarUrl = tgWebAppData?.user?.photo_url

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

  const handleWithdraw = async (value: string) => {
    const payload = {
      amount: value,
      address: userFriendlyAddress,
    }

    try {
      await withdrawBalance(payload).unwrap()

      openSheet(
        <SuccessBottomSheet
          title={t("withdraw_success")}
          actionButtons={[
            <Button type="primary" size="large" onClick={closeAll}>
              {t("buttons.finish")}
            </Button>,
          ]}
        />,
        {
          bottomSheetTitle: t("withdrawal_of_funds"),
        }
      )
    } catch (e) {
      openSheet(
        <ErrorBottomSheet
          errorTitle={t("withdraw_error")}
          errorText={t("withdraw_error_description")}
          actionButtons={[
            <Button
              type="secondary"
              size="large"
              onClick={() =>
                openTelegramLink.ifAvailable("https://t.me/TeleportNFT")
              }
            >
              {t("buttons.contact_support")}
            </Button>,
            <Button
              type="primary"
              size="large"
              onClick={handleOpenWithdrawModal}
            >
              {t("buttons.retry")}
            </Button>,
          ]}
        />,
        {
          bottomSheetTitle: t("withdrawal_of_funds"),
        }
      )
    }
  }

  const handleTopUp = async (value: string) => {
    const { data } = await topUpBalance({ amount: value })

    if (!data) return

    const validUntil = Math.floor(Date.now() / 1000) + 300

    const transaction: SendTransactionRequest = {
      validUntil,
      network: CHAIN.MAINNET, // или CHAIN.TESTNET, если тестируете
      messages: [
        {
          address: data.address,
          amount: data.amount,
          payload: data.payload || "",
        },
      ],
    }

    try {
      await tonConnectUI.sendTransaction(transaction)
      closeAll()

      dispatch(
        addSnackbar({
          title: "Успешное пополнение",
          description: `Баланс пополнен на ${value} TON`,
          autoHide: true,
          duration: 5000,
        })
      )
    } catch (e: any) {
      const description = e.message.includes("No enough funds")
        ? t("no_enough_funds_error")
        : t("unknown_error")

      openSheet(
        <ErrorBottomSheet
          errorTitle={t("top_up_balance_error")}
          errorText={description}
          actionButtons={[
            <Button
              type="secondary"
              size="large"
              onClick={() =>
                openTelegramLink.ifAvailable("https://t.me/TeleportNFT")
              }
            >
              {t("buttons.contact_support")}
            </Button>,
            <Button
              type="primary"
              size="large"
              onClick={() => {
                closeSheet()
                // handleOpenTopUpModal()
              }}
            >
              {t("buttons.retry")}
            </Button>,
          ]}
        />,
        {
          bottomSheetTitle: t("top_up_balance"),
        }
      )
    }
  }

  const handleToggleWallet = () => {
    openSheet(
      <Wallet
        address={userFriendlyAddress}
        balance={formatAmount(balance?.available || "0")}
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
        availableWithdrawValue={formatAmount(balance?.available || "0")}
        withdrawValue={value}
        handleWithdraw={handleWithdraw}
      />,
      {
        bottomSheetTitle: `${t("withdrawal_of_funds")}`,
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
          closeAll()
        },
      }
    )
  }

  return (
    <Page back={false}>
      <div className={styles.profilePage}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <Avatar src={avatarUrl} />
            <span className={styles.username}>@{user?.username}</span>
          </div>
          <Wallet
            address={userFriendlyAddress}
            balance={formatAmount(balance?.available || "0")}
            onConnect={handleConnectWallet}
            onCopy={handleCopyWallet}
            onToggle={handleToggleWallet}
          />
        </div>

        <div className={styles.balanceBlock}>
          <span className={styles.balanceLabel}>Баланс</span>
          <span className={styles.balanceValue}>
            <span className={styles.balanceAmount}>
              {formatAmount(balance?.available || "0")}
            </span>
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
          <TransactionBlock />
        </div>
      </div>
      <Outlet />
    </Page>
  )
}
