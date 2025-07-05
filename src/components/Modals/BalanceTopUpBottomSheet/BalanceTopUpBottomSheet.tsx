import { FC, useCallback, useMemo, useState } from "react"
import Icon from "@/components/common/Icon/Icon"
import accountBalanceIcon from "@/static/icons/account_balance_wallet.svg"
import tonSrc from "@/static/icons/icn-S_ton.svg"

import styles from "./BalanceTopUpBottomSheet.module.scss"
import { BalanceUpInput } from "./Input/BalanceUpInput"
import { Button } from "@/components/common/Button/Button"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { LoadingTopUpBalanceBottomSheet } from "../LoadingTopUpBalanceBottomSheet/LoadingTopUpBalanceBottomSheet"
import { SuccessBuyNftBottomSheet } from "../SuccessBuyNftBottomSheet/SuccessBuyNftBottomSheet"

type Props = {
  purchasePrice: string
  availableBalance: string
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
      renderLeftHeader() {
        return (
          <span className={styles.bottomSheetTitle}>Пополнение баланса</span>
        )
      },
    })

    try {
      await doTopUp()
      openSheet(<SuccessBuyNftBottomSheet onConfirm={closeAll} />, {
        renderLeftHeader() {
          return <span className={styles.bottomSheetTitle}>Покупка NFT</span>
        },
      })
    } catch (error) {
      //openSheet(ERRORBOTTOMSHEET)
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
            <Icon src={tonSrc} pathColor="#278FFF" />
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
