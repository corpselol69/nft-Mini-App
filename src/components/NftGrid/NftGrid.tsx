import React from "react";
import styles from "./NftGrid.module.scss";
import { NftCard } from "../NftCard/NftCard";

// Пример данных для карточек
const mockNfts = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export const NftGrid: React.FC = () => {
  return (
    <div className={styles.grid}>
      {mockNfts.map((nft) => (
        <NftCard key={nft.id} />
      ))}
    </div>
  );
};
