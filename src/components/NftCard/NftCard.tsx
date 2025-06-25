import React from "react";
import styles from "./NftCard.module.scss";

const img =
  "http://localhost:3845/assets/862f844992ea8740d933b1bbd7188e7939aebba4.png";
const img1 =
  "http://localhost:3845/assets/775fdcdd1a6b548f2a55186554f61c07417ba8d4.png";
const img2 =
  "http://localhost:3845/assets/4861de37283e490f943a181eaccdd9c0953b5840.svg";
const img3 =
  "http://localhost:3845/assets/b3c569ba5cef1a0c2fa02cc7fc5d1842bb9e34a6.svg";
const img4 =
  "http://localhost:3845/assets/da177adf5112623a12993f4a05878c2451dc85b5.svg";

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
          <div className={styles.priceBtn}>
            <span className={styles.price}>95</span>
            <img className={styles.tonIcon} src={img2} alt="TON" />
          </div>
          <div className={styles.cartBtn}>
            <span className={styles.cartIcon}>
              <img
                src={img4}
                alt="Add to cart"
                style={{ maskImage: `url('${img3}')` }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
