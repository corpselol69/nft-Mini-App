import { Tabs, Tab } from "@/components/Tabs/Tabs";
import type { FC } from "react";
import styles from "./MarketplacePage.module.scss";

import { Outlet, useLocation } from "react-router-dom";
import { t } from "i18next";

export const MarketplacePage: FC = () => {
  const location = useLocation();

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t("market")}</p>
      <Tabs>
        <Tab to="/market/stickers">{t("stickers")}</Tab>
        <Tab to="/market/gifts">{t("gifts")}</Tab>
      </Tabs>
      <Outlet /> {/* сюда подставятся Grid или Detail-страницы */}
    </div>
  );
};
