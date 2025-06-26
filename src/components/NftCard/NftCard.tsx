import React from "react";
import tonIcon from "../../../assets/icons/icn-S_ton.svg";
import addIcon from "../../../assets/icons/icn-add_shopping_cart.svg";
import styles from "./NftCard.module.scss";
import { Button } from "../Button/Button";

const img =
  "http://localhost:3845/assets/862f844992ea8740d933b1bbd7188e7939aebba4.png";
const img1 =
  "http://localhost:3845/assets/775fdcdd1a6b548f2a55186554f61c07417ba8d4.png";
const img3 =
  "http://localhost:3845/assets/b3c569ba5cef1a0c2fa02cc7fc5d1842bb9e34a6.svg";

export const NftCard: React.FC = () => {
  return (
    <div className={styles.root}>
      <div
        className={styles.pic}
        style={{ backgroundImage: `url('${img}'), url('${img1}')` }}
      />
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <div className={styles.title}>Bored Stickers</div>
          <div className={styles.subtitle}>#0001</div>
        </div>
        <div className={styles.actions}>
          <Button color="accent" style={{ flex: 1 }}>
            95
            <img className={styles.tonIcon} src={tonIcon} alt="TON" />
          </Button>
          <Button type="secondary">
            <img src={addIcon} alt="Add to cart" />
          </Button>
        </div>
      </div>
    </div>
  );
};
