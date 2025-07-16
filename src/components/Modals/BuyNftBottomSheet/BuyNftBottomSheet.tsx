import { FC } from "react"

import styles from "./BuyNftBottomSheet.module.scss"
import { AvailableBalance } from "@/components/common/AvailableBalance/AvailableBalance"

type Props = {
  url: string
  title: string
  id: string
  price: number
  availableBalance: string
}

export const BuyNftBottomSheet: FC<Props> = ({
  availableBalance,
  id,
  url,
  price,
  title,
}) => {
  return (
    <div className={styles.addToCartBottomSheetWrapper}>
      <div className={styles.titleAndPriceWrapper}>
        <div className={styles.imageAndTitleWrapper}>
          <div className={styles.imageWrapper}>
            <img src={url} />
          </div>
          <div className={styles.titleAdnIdWrapper}>
            <span className={styles.titleText}>{title}</span>
            <span className={styles.idText}>#{id}</span>
          </div>
        </div>
        <div>
          <span className={styles.priceText}>{price}</span>{" "}
          <span className={styles.priceValue}>TON</span>
        </div>
      </div>
      <AvailableBalance balance={availableBalance} />
    </div>
  )
}
