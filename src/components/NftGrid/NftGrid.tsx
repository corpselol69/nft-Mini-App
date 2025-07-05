import React from "react"
import styles from "./NftGrid.module.scss"
import { NftCard } from "../NftCard/NftCard"

type TProps = {
  mockNfts: { id: number; title: string; price: number; url: string }[]
  onNftClick: (nft: any) => void
  onAddToCart?: (nft: {
    imgLink: string
    title: string
    id: string
    price: string
  }) => void
}

export const NftGrid: React.FC<TProps> = ({
  mockNfts,
  onNftClick,
  onAddToCart,
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
          onClick={() => onNftClick(nft.id)}
          addToCart={() =>
            onAddToCart?.({
              ...nft,
              imgLink: nft.url,
              price: nft.price.toString(),
              id: nft.id.toString(),
            })
          }
        />
      ))}
    </div>
  )
}
