import { FC } from "react"
import { NftBottomSheetProps } from "./NftBottomSheet.d"
import styles from "./NftBottomSheet.module.scss"
import { NftDetailsTable } from "../NftDetailsTable/NftDetailsTable"

import monkeyImg from "@/static/placeholders/monkey.png"

import { ModalButtonsWrapper } from "@/components/common/ModalButtonsWrapper/ModalButtonsWrapper"

export const NftBottomSheet: FC<NftBottomSheetProps> = ({
  //availableBalance,
  collection,
  //imgLink,
  issued,
  number,
  price,
}) => {
  //TODO: добавить логику проверки на наличие в корзине
  const isInCart = true

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.imageWrapper}>
        <img
          height={210}
          width={210}
          className={styles.nftImage}
          src={monkeyImg}
          alt="STICKER"
        />
      </div>
      <div className={styles.tableDataWrapper}>
        <NftDetailsTable
          collection={collection}
          issued={issued}
          number={number}
          price={price}
        />
      </div>

      <ModalButtonsWrapper price={price} balance={0} isInCart={isInCart} />
    </div>
  )
}
