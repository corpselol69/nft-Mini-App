import { FC, useCallback } from "react"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import styles from "./BuyNftBottomSheet.module.scss"

import questionMarkImg from "@/static/icons/question_mark.svg"
import { Button } from "../common/Button/Button"

type Props = {
  nftPrice: string
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
  const { openSheet } = useBottomSheet()

  const handleOnBuyClick = useCallback(() => {
    onBuy()
    openSheet(<></>, {
      renderLeftHeader() {
        return <span className={styles.bottomSheetTitle}>Покупка NFT</span>
      },
    })
  }, [])

  return (
    <div className={styles.buyBottomSheetWrapper}>
      <div className={styles.buyBottomSheetImage}>
        <img src={questionMarkImg} />
      </div>
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
          Отменить
        </Button>
        <Button type="primary" onClick={handleOnBuyClick} size="large">
          Купить
        </Button>
      </div>
    </div>
  )
}
