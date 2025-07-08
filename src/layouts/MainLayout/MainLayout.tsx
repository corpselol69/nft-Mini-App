import { useEffect, useState } from "react"
import { Outlet, NavLink, useMatch } from "react-router-dom"
import storeIcon from "@/static/icons/store.svg"
import cardsIcon from "@/static/icons/cards_star.svg"

import { t } from "i18next"
import { miniApp, swipeBehavior, viewport } from "@telegram-apps/sdk"

import styles from "./MainLayout.module.scss"
import Icon from "@/components/common/Icon/Icon"

export function MainLayout() {
  const isMarket = !!useMatch({ path: "/market/*" })
  const isMyNft = !!useMatch({ path: "/my-nft/*" })
  const isProfile = !!useMatch({ path: "/profile" })

  const [paddingTop, setPaddingTop] = useState(0)
  const [paddingBottom, setPaddingBottom] = useState(0)

  useEffect(() => {
    if (viewport.isFullscreen() && miniApp.isMounted()) {
      const safeArea = viewport.safeAreaInsets()
      const totalPadding = safeArea.top + safeArea.bottom
      setPaddingTop(totalPadding)
      setPaddingBottom(safeArea.bottom)
    }

    swipeBehavior.mount.ifAvailable()
    if (swipeBehavior.isMounted()) {
      swipeBehavior.disableVertical()
    }
  }, [])

  return (
    <div className={styles.root}>
      <main className={styles.content} style={{ paddingTop }}>
        <Outlet />
      </main>

      <nav
        className={styles.tabbar}
        style={{ paddingBottom }}
        aria-label="Bottom navigation"
      >
        <NavLink
          to="/market"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <Icon src={storeIcon} color={isMarket ? "active" : "default"} />
          <span>{t("market")}</span>
        </NavLink>
        <NavLink
          to="/my-nft"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <Icon src={cardsIcon} color={isMyNft ? "active" : "default"} />
          <span>{t("my_nft")}</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <div
            className={`${styles.avatar} ${isProfile ? styles.active : ""}`}
          ></div>
          <span>{t("profile")}</span>
        </NavLink>
      </nav>
    </div>
  )
}
