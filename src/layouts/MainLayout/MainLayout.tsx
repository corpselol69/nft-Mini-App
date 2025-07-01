import { Outlet, NavLink } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import { t } from "i18next";
import { viewport } from "@telegram-apps/sdk";

import { useEffect, useState } from "react";

export function MainLayout() {
  const [paddingTop, setPaddingTop] = useState(0);

  useEffect(() => {
    if (viewport.isFullscreen()) {
      const safeArea = viewport.safeAreaInsets();
      const totalPadding = safeArea.top + 44;
      setPaddingTop(totalPadding);
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
        >
          <span>{t("market")}</span>
        </NavLink>
        <NavLink
          to="/my-nft"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <span>{t("my_nft")}</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <span>{t("profile")}</span>
        </NavLink>
      </nav>
    </div>
  );
}
