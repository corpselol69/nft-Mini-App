import autorenewIcon from "@/static/icons/autorenew.svg"

import styles from "./LoadingTopUpBalanceBottomSheet.module.scss"

export const LoadingTopUpBalanceBottomSheet = () => {
  return (
    <div className={styles.loadingTopUpBalanceWrapper}>
      <div className={styles.buyBottomSheetImage}>
        <img src={autorenewIcon} />
      </div>
      <div className={styles.textWrapper}>
        <span className={styles.title}>Ожидание совершения тразакции</span>
        <span className={styles.subText}>
          Для завершения покупки NFT дождитесь пополнения баланса и завершения
          покупки. Это занимает не более одной минуты
        </span>
      </div>
    </div>
  )
}
