import { useEffect, useState, type FC } from "react";

import { Page } from "@/components/Page.tsx";

import styles from "./StickersPage.module.scss";
import { Select } from "@/components/common/Select/Select";
import { Input } from "@/components/common/Input/Input";
import { SELECT_DATA } from "@/components/StickersGrid/model/const";
import searchIcon from "@/static/icons/searchIcon.svg";
import { NftGrid } from "@/components/NftGrid/NftGrid";

import Icon from "@/components/common/Icon/Icon";
import { IStickersPageProps } from "./StickersPage.d";
import { Outlet, useNavigate } from "react-router-dom";

export const StickersPage: FC<IStickersPageProps> = () => {
  const navigate = useNavigate();

  const onCardClick = (cardId: string) => {
    navigate(`/market/stickers/${cardId}`);
  };
  const [value, setValue] = useState("");

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
        <NftGrid onNftClick={onCardClick} />
        <Outlet />
      </div>
    </Page>
  );
};
