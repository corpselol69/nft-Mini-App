import React from "react";
// import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { IGiftItem } from "@/components/GiftsGrid/types";
import snowImg from "@/static/placeholders/snow.png";
import styles from "./GiftItemSheet.module.scss";
import { GIFT_ACTIONS } from "../model/const";
import { ActionButton } from "../ui/ActionButton/ActionButton";

type Props = {
  gift: IGiftItem;
};

export const GiftItemSheet: React.FC<Props> = ({ gift }) => {
  // const { openSheet, closeSheet } = useBottomSheet()

  return (
    <div className={styles.detailGiftSheet}>
      <div
        className={styles.detailGiftSheetImageWrapper}
        style={{ backgroundImage: `url(${snowImg})` }}
      >
        <div className={styles.detailGiftSheetImageText}>
          <span className={styles.detailGiftSheetName}>{gift.name}</span>
          <span className={styles.detailGiftSheetSubName}>{gift.id}</span>
        </div>
      </div>
      <div className={styles.detailGiftSheetActions}>
        {GIFT_ACTIONS.map((el) => (
          <ActionButton onClick={el.onClick} icon={el.icon}>
            {el.label}
          </ActionButton>
        ))}
      </div>
    </div>
  );
};
