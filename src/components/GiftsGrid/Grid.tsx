import React from "react";
import styles from "./GiftsGrid.module.scss";
import { ItemCard } from "./ItemCard/ItemCard";
import { mockGiftCards } from "./const";

type TProps = {};

export const Grid: React.FC<TProps> = ({}) => {
  return (
    <div className={styles.grid}>
      {mockGiftCards.map((nft) => (
        <ItemCard key={nft.id} item={nft} />
      ))}
    </div>
  );
};
