import React from "react";
import tonIcon from "@/static/icons/icn-S_ton.svg";
import addIcon from "@/static/icons/shopping_cart.svg";
import monkey from "@/static/placeholders/monkey.png";
import styles from "./NftCard.module.scss";
import { Button } from "@/components/common/Button/Button";
import Icon from "../common/Icon/Icon";

type TProps = {
  onClick: () => void;
};

//TODO: добавить нормальны пропы и вынести компонент в shared слой
export const NftCard: React.FC<TProps> = ({ onClick }) => {
  return (
    <div className={styles.root}>
      <div
        className={styles.pic}
        style={{ backgroundImage: `url(${monkey})` }}
        onClick={onClick}
      />
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <div className={styles.title}>Bored Stickers</div>
          <div className={styles.subtitle}>#0001</div>
        </div>
        <div className={styles.actions}>
          <Button color="accent" style={{ flex: 1 }}>
            95
            <Icon src={tonIcon} className={styles.tonIcon} />
          </Button>
          <Button type="secondary">
            <img src={addIcon} alt="Add to cart" />
          </Button>
        </div>
      </div>
    </div>
  );
};
