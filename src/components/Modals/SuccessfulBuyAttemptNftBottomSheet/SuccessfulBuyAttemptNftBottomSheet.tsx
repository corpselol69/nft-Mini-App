import { FC } from "react"
import styles from "./SuccessfulBuyAttemptNftBottomSheet.module.scss"

import checkSmallImg from "@/static/icons/check_small.svg"
import { Button } from "@/components/common/Button/Button"

type Props = {
  onConfirm: () => void
}

export const SuccessfulBuyNftBottomSheet: FC<Props> = ({ onConfirm }) => {
  return (
    <div className={styles.buyBottomSheetWrapper}>
      <div className={styles.buyBottomSheetImage}>
        <img src={checkSmallImg} />
      </div>
      <div className={styles.buyBottomSheetTextWrapper}>
        <div className={styles.buyBottomSheetTextTitle}>
          <span>NFT успешно куплен</span>
        </div>
        <div className={styles.buyBottomSheetSubText}>
          <span>Мы уже отправили NFT к вам в профиль</span>
        </div>
      </div>
      <div className={styles.actionButtonsWrapper}>
        <Button type="primary" onClick={onConfirm} size="large">
          Готово
        </Button>
      </div>
    </div>
  )
}
