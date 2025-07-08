import { FC, useCallback } from "react"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import styles from "./BuyNftBottomSheet.module.scss"

import questionMarkImg from "@/static/icons/question_mark.svg"
import { Button } from "@/components/common/Button/Button"
import { SuccessBuyNftBottomSheet } from "../SuccessBuyNftBottomSheet/SuccessBuyNftBottomSheet"
import Icon from "@/components/common/Icon/Icon"
import { t } from "i18next"

type Props = {
  nftPrice: number
  quantity: string
  onBuy: () => void
  onCancel: () => void
}

export const BuyNftBottomSheet: FC<Props> = ({
  nftPrice,
  onBuy,
  onCancel,
  quantity = 1,
}) => {
  const { openSheet, closeAll } = useBottomSheet()

  const handleOnBuyClick = useCallback(() => {
    onBuy()
    openSheet(<SuccessBuyNftBottomSheet onConfirm={closeAll} />, {
      renderLeftHeader() {
        return <span className={styles.bottomSheetTitle}>Покупка NFT</span>
      },
    })
  }, [])

  return (
    <div className={styles.buyBottomSheetWrapper}>
      <Icon src={questionMarkImg} className={styles.buyBottomSheetImage} />

      <div className={styles.buyBottomSheetTextWrapper}>
        <div className={styles.buyBottomSheetTextTitle}>
          <span>Подтвердите покупку</span>
        </div>
        <div className={styles.buyBottomSheetSubText}>
          <span className={styles.buyBottomSheetSubTextValue}>
            Вы совершаете покупку{" "}
            <span className={styles.buyBottomSheetQuantity}>
              {quantity} NFT
            </span>{" "}
            за{" "}
            <span className={styles.buyBottomSheetPrice}>{nftPrice} TON</span>
          </span>
        </div>
      </div>
      <div className={styles.actionButtonsWrapper}>
        <Button type="secondary" onClick={onCancel} size="large">
          {t("buttons.cancel")}
        </Button>
        <Button type="primary" onClick={handleOnBuyClick} size="large">
          {t("buttons.buy")}
        </Button>
      </div>
    </div>
  )
}
