import { FC, ReactNode, useCallback, useMemo, useState } from "react"
import Icon from "@/components/common/Icon/Icon"
import accountBalanceIcon from "@/static/icons/account_balance_wallet.svg"
import tonSrc from "@/static/icons/icn-S_ton.svg"

import styles from "./BalanceTopUpBottomSheet.module.scss"
import { Button } from "@/components/common/Button/Button"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { LoadingTopUpBalanceBottomSheet } from "../LoadingTopUpBalanceBottomSheet/LoadingTopUpBalanceBottomSheet"
import { SuccessBuyNftBottomSheet } from "../SuccessBuyNftBottomSheet/SuccessBuyNftBottomSheet"
import { ErrorBottomSheet } from "../ErrorBottomSheet/ErrorBottomSheet"
import { t } from "i18next"
import { BalanceUpInput } from "@/components/common/InputWithUnit/BalanceUpInput"

type Props = {
  purchasePrice: number
  availableBalance: number
  onClose: () => void
}

async function doTopUp() {
  return new Promise(r => setTimeout(r, 2000))
}

export const BalanceTopUpBottomSheet: FC<Props> = ({
  onClose,
  purchasePrice,
  availableBalance,
}) => {
  const [topUpPriceValue, setTopUpPriceValue] = useState("")

  const { openSheet, closeAll } = useBottomSheet()

  const handleTopUp = async () => {
    openSheet(<LoadingTopUpBalanceBottomSheet />, {
      bottomSheetTitle: `${t("top_up_balance")}`,
    })

    try {
      await doTopUp()
      openSheet(
        <SuccessBuyNftBottomSheet
          title={"NFT успешно куплен"}
          subTitle="Мы уже отправили NFT к вам в профиль"
          actionButtons={[
            <Button type="primary" size="large" onClick={closeAll}>
              Готово
            </Button>,
          ]}
        />,
        {
          bottomSheetTitle: `${t("buy_nft")}`,
        }
      )
    } catch (error) {
      const retry = () => {
        closeAll()
        handleTopUp()
      }
      const actionButtons: ReactNode[] =
        (error as any)?.type === "topup"
          ? [
              <Button
                type="secondary"
                size="large"
                onClick={() => console.log("написать в поддержку")}
              >
                Написать в службу поддержки
              </Button>,
              <Button type="primary" onClick={retry} size="large">
                Повторить попытку
              </Button>,
            ]
          : [
              <Button onClick={closeAll} type="primary" size="large">
                Закрыть
              </Button>,
            ]
      openSheet(
        <ErrorBottomSheet
          errorTitle={
            (error as any)?.type === "topup"
              ? "Ошибка пополнения"
              : "Покупка NFT"
          }
          errorText={
            (error as any)?.type === "topup"
              ? "Не удалось пополнить баланс. Повторите попытку или обратитесь в службу поддержки."
              : "Не удалось купить NFT: цена изменилась или она уже была куплена."
          }
          actionButtons={actionButtons}
        />,
        {
          bottomSheetTitle:
            (error as any)?.type === "topup"
              ? "Ошибка пополнения"
              : "Покупка NFT",
        }
      )
    }
  }

  const missingAmount = useMemo(() => {
    return (Number(purchasePrice) - Number(availableBalance)).toString()
  }, [purchasePrice, availableBalance])

  const handleClickOnTheMissingAmount = useCallback(() => {
    setTopUpPriceValue(missingAmount)
  }, [])

  return (
    <div className={styles.balanceTopUpWrapper}>
      <div className={styles.connectedWalletWrapper}>
        <span className={styles.connectedWalletText}>
          Подключенный кошелек:
        </span>
        <div className={styles.walletNumberWrapper}>
          <Icon src={accountBalanceIcon} />
          <span className={styles.walletNumberValue}>UQD6...naYv</span>
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <BalanceUpInput onChange={setTopUpPriceValue} value={topUpPriceValue} />
      </div>
      <div className={styles.balanceInfoWrapper}>
        <div className={styles.balanceInfoRow}>
          <span>Доступный баланс</span>
          <div className={styles.balanceInfoRowValue}>
            <span>{availableBalance}</span>
            <Icon src={tonSrc} opacity="0.6" />
          </div>
        </div>
        <div className={styles.balanceInfoRow}>
          <span>Стоимость покупки</span>
          <div className={styles.balanceInfoRowValue}>
            <span>{purchasePrice}</span>
            <Icon src={tonSrc} opacity="0.6" />
          </div>
        </div>
        <div className={styles.breakLine} />
        <div className={styles.balanceInfoRow}>
          <span>Недостающая сумма</span>
          <div
            className={styles.balanceInfoRowValue}
            onClick={handleClickOnTheMissingAmount}
          >
            <span className={styles.balanceInfoRowValueBlue}>
              {missingAmount}
            </span>
            <Icon src={tonSrc} className={styles.tonIcn} />
          </div>
        </div>
      </div>
      <div className={styles.actionButtonsWrapper}>
        <Button type="secondary" onClick={onClose} size="large">
          Отмена
        </Button>
        <Button type="primary" onClick={handleTopUp} size="large">
          Пополнить на {missingAmount}
          <Icon src={tonSrc} />
        </Button>
      </div>
    </div>
  )
}
