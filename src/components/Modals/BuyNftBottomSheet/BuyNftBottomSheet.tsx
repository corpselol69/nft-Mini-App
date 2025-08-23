import { FC } from "react"

import styles from "./BuyNftBottomSheet.module.scss"
import { AvailableBalance } from "@/components/common/AvailableBalance/AvailableBalance"
import { NftListItem } from "@/types/market"

type Props = {
  nft: NftListItem
  availableBalance: string
}

export const BuyNftBottomSheet: FC<Props> = ({ availableBalance, nft }) => {
  return (
    <div className={styles.addToCartBottomSheetWrapper}>
      <div className={styles.titleAndPriceWrapper}>
        <div className={styles.imageAndTitleWrapper}>
          <div className={styles.imageWrapper}>
            <img src={nft.preview} />
          </div>
          <div className={styles.titleAdnIdWrapper}>
            <span className={styles.titleText}>{nft.title}</span>
            <span className={styles.idText}>#{nft.number}</span>
          </div>
        </div>
        <div>
          <span className={styles.priceText}>{nft.price}</span>{" "}
          <span className={styles.priceValue}>TON</span>
        </div>
      </div>
      <AvailableBalance balance={availableBalance} />
    </div>
  )
}
