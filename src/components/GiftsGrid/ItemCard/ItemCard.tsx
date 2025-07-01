import React from "react";
import styles from "./ItemCard.module.scss";
import { Button } from "../../Button/Button";
import { TonIcon } from "./TonIcon";
import snowImg from "../../../../assets/monkey.png";

type TProps = {
  onClick: () => void;
};

export const ItemCard: React.FC<TProps> = ({ onClick }) => {
  return (
    <div className={styles.root}>
      <div
        className={styles.pic}
        style={{ backgroundImage: `url(${snowImg})`, backgroundSize: "165px" }}
        onClick={onClick}
      />
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <div className={styles.title}>Bored Stickers</div>
        </div>
        <div className={styles.actions}>
          <Button type="secondary">
            от 95
            <TonIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
