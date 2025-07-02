import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import storeIcon from "@/static/icons/store.svg";
import cardsIcon from "@/static/icons/cards_star.svg";

import { t } from "i18next";
import { miniApp, swipeBehavior, viewport } from "@telegram-apps/sdk";

import styles from "./MainLayout.module.scss";
import Icon from "@/components/common/Icon/Icon";

export function MainLayout() {
  const [paddingTop, setPaddingTop] = useState(0);
  const [activeTab, setActiveTab] = useState<"market" | "my-nft" | "profile">(
    "market"
  );

  useEffect(() => {
    if (viewport.isFullscreen() && miniApp.isMounted()) {
      const safeArea = viewport.safeAreaInsets();
      const totalPadding = safeArea.top + safeArea.bottom;
      setPaddingTop(totalPadding);
    }

    swipeBehavior.mount.ifAvailable();
    if (swipeBehavior.isMounted()) {
      swipeBehavior.disableVertical();
    }
  }, []);

  return (
    <div className={styles.root}>
      <main className={styles.content} style={{ paddingTop }}>
        <Outlet />
      </main>

      <nav className={styles.tabbar} aria-label="Bottom navigation">
        <NavLink
          to="/market"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          onClick={() => setActiveTab("market")}
        >
          <Icon
            src={storeIcon}
            color={activeTab === "market" ? "active" : "default"}
          />
          <span>{t("market")}</span>
        </NavLink>
        <NavLink
          to="/my-nft"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          onClick={() => setActiveTab("my-nft")}
        >
          <Icon
            src={cardsIcon}
            color={activeTab === "my-nft" ? "active" : "default"}
          />
          <span>{t("my_nft")}</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          onClick={() => setActiveTab("profile")}
        >
          <div
            className={`${styles.avatar} ${
              activeTab === "profile" ? styles.active : ""
            }`}
          ></div>
          <span>{t("profile")}</span>
        </NavLink>
      </nav>
    </div>
  );
}
