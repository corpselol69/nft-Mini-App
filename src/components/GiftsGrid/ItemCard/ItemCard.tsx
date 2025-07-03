import React from "react";
import styles from "./ItemCard.module.scss";
import { Button } from "@/components/common/Button/Button";
import tonIcon from "@/static/icons/icn-S_ton.svg";
import snowImg from "@/static/placeholders/snow.png";
import { IGiftCard } from "../types";
import Icon from "@/components/common/Icon/Icon";
import { NavLink } from "react-router-dom";

type TProps = {
  item: IGiftCard;
};

export const ItemCard: React.FC<TProps> = ({ item }) => {
  return (
    <NavLink to={`/market/gifts/${item.id}`} className={styles.root}>
      <div
        className={styles.pic}
        style={{
          backgroundImage: `url(${snowImg})`,
          backgroundSize: "165px",
        }}
      />
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <div className={styles.title}>{item.name}</div>
        </div>
        <div className={styles.actions}>
          <Button type="secondary">
            от {item.price}
            <Icon src={tonIcon} color="active" style={{ width: "16px" }} />
          </Button>
        </div>
      </div>
    </NavLink>
  );
};
