import { Tabs, Tab } from "@/components/Tabs/Tabs";
import { type FC } from "react";
import styles from "./MarketplacePage.module.scss";

import { t } from "i18next";

import { Outlet } from "react-router-dom";

export const MarketplacePage: FC = () => {
  return (
    <div className={styles.root}>
      <p className={styles.title}>{t("market")}</p>
      <Tabs>
        <Tab to="/market/stickers">{t("stickers")}</Tab>
        <Tab to="/market/gifts">{t("gifts")}</Tab>
      </Tabs>
      <Outlet />
    </div>
  );
};
