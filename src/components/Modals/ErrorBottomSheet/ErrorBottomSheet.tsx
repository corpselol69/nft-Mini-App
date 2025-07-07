import { FC, ReactNode } from "react"
import styles from "./ErrorBottomSheet.module.scss"

import lCloseIcon from "@/static/icons/icn-L_Close.svg"

type Props = {
  errorTitle: string
  errorText: string
  actionButtons?: ReactNode[]
}

export const ErrorBottomSheet: FC<Props> = ({
  actionButtons,
  errorText,
  errorTitle,
}) => {
  return (
    <div className={styles.buyBottomSheetWrapper}>
      <div className={styles.buyBottomSheetImage}>
        <img src={lCloseIcon} />
      </div>
      <div className={styles.buyBottomSheetTextWrapper}>
        <div className={styles.buyBottomSheetTextTitle}>
          <span>{errorTitle}</span>
        </div>
        <div className={styles.buyBottomSheetSubText}>
          <span>{errorText}</span>
        </div>
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
