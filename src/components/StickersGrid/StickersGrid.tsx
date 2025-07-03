import { useState, type FC } from "react";

import { Page } from "@/components/Page.tsx";

import styles from "./StickersGrid.module.scss";
import { Select } from "../common/Select/Select";
import { Input } from "../common/Input/Input";
import { NftBottomSheet } from "@/components/StickersGrid/ui/NftBottomSheet/NftBottomSheet";
import { SELECT_DATA } from "@/components/StickersGrid/model/const";
import { BottomSheet } from "../common/BottomSheet/BottomSheet";
import searchIcon from "@/static/icons/searchIcon.svg";
import { NftGrid } from "../NftGrid/NftGrid";
import shareIcon from "@/static/icons/shareIcon.svg";
import { shareURL } from "@telegram-apps/sdk";
import Icon from "../common/Icon/Icon";
import { Button } from "@/components/Button/Button";

export const StickersGrid: FC = () => {
  const [value, setValue] = useState("");
  const [selectedNftCard, setSelectedNftCard] = useState();

  return (
    <Page back={false}>
      <div>
        <div className={styles.filterWrapper}>
          <div className={styles.selectWrapper}>
            <Select
              options={SELECT_DATA}
              value={value}
              onChange={setValue}
              defaultValue={SELECT_DATA[0].value}
            />
            <Select options={[]} onChange={() => {}} placeholder="Модель" />
          </div>
          <Input
            icon={<Icon src={searchIcon} />}
            placeholder="Поиск по названию или ID"
          />
        </div>
        <NftGrid onNftClick={setSelectedNftCard} />
        <BottomSheet
          open={!!selectedNftCard}
          onClose={() => setSelectedNftCard(undefined)}
          renderLeftHeader={() => (
            <Button
              type="icon"
              className={styles.shareButton}
              onClick={() => {
                if (shareURL.isAvailable()) {
                  shareURL(
                    "https://t.me/d33sf0me",
                    "Check out this cool sticker!"
                  );
                }
              }}
            >
              <Icon src={shareIcon} />
            </Button>
          )}
        >
          <NftBottomSheet
            availableBalance="12,4"
            collection="Bored Stickers"
            number="#0001"
            imgLink=""
            issued="9 999/9 999"
            price="95"
          />
        </BottomSheet>
      </div>
    </Page>
  );
};
