import React from "react"
import styles from "./NftGrid.module.scss"
import { NftCard } from "../NftCard/NftCard"

type TProps = {
  mockNfts: {
    id: number
    title: string
    price: number
    url: string
    status: "sell" | "on sale"
  }[]
  onNftClick: (nft: any) => void
  onAddToCart?: (nft: {
    imgLink: string
    title: string
    id: string
    price: number
  }) => void

  mainClick?: (nft: {
    imgLink: string
    title: string
    id: string
    price: number
  }) => void
  secondaryClick?: (nft: {
    imgLink: string
    title: string
    id: string
    price: number
  }) => void
}

export const NftGrid: React.FC<TProps> = ({
  mockNfts,
  onNftClick,
  onAddToCart, //заменить на secondaryClick
  mainClick, // бывший onBuy
  // secondaryClick,
}) => {
  return (
    <div className={styles.grid}>
      {mockNfts.map(nft => (
        <NftCard
          key={nft.id}
          title={nft.title}
          id={nft.id}
          price={nft.price}
          url={nft.url}
          status={nft.status}
          onClick={() => onNftClick(nft.id)}
          addToCart={() =>
            onAddToCart?.({
              ...nft,
              imgLink: nft.url,
              price: nft.price,
              id: nft.id.toString(),
            })
          }
          onMainClick={() =>
            mainClick?.({
              ...nft,
              imgLink: nft.url,
              price: nft.price,
              id: nft.id.toString(),
            })
          }
        />
      ))}
    </div>
  )
}
