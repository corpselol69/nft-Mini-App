import { FC } from "react"

import styles from "./SellNftModal.module.scss"

import { Input } from "@/components/common/Input/Input"

type Props = {
  nfts: {
    id: string
    title: string
    number: string
    price: number
    preview: string
    background?: string
  }[]
}

export const SellNftModal: FC<Props> = ({ nfts }) => {
  return (
    <div className={styles.container}>
      {nfts.map(nft => (
        <div className={styles.titleAndPriceWrapper}>
          <div className={styles.imageWrapper}>
            <img className={styles.bg} src={nft.background} alt={nft.title} />
            <img src={nft.preview} className={styles.preview} />
          </div>
          <div className={styles.titleAndIdWrapper}>
            <span className={styles.titleText}>{nft.title}</span>
            <span className={styles.idText}>#{nft.number}</span>
          </div>

          <Input value={nft.price} />
        </div>
      ))}
    </div>
  )
}
