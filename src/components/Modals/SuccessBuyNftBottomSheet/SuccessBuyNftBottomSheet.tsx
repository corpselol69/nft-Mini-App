import { FC, ReactNode } from "react"
import styles from "./SuccessBuyNftBottomSheet.module.scss"

import checkSmallImg from "@/static/icons/check_small.svg"

type Props = {
  title: string
  subTitle?: string
  actionButtons?: ReactNode[]
}

export const SuccessBuyNftBottomSheet: FC<Props> = ({
  subTitle,
  title,
  actionButtons,
}) => {
  return (
    <div className={styles.buyBottomSheetWrapper}>
      <div className={styles.buyBottomSheetImage}>
        <img src={checkSmallImg} />
      </div>
      <div className={styles.buyBottomSheetTextWrapper}>
        <div className={styles.buyBottomSheetTextTitle}>
          <span>{title}</span>
        </div>

        {subTitle && (
          <div className={styles.buyBottomSheetSubText}>
            <span>{subTitle}</span>
          </div>
        )}
      </div>
      {actionButtons && actionButtons.length > 0 && (
        <div className={styles.actionButtonsWrapper}>
          {actionButtons.map(el => {
            return <>{el}</>
          })}
        </div>
      )}
    </div>
  )
}
