import type { FC } from "react"
import React from "react"
import { NavLink, useMatch } from "react-router-dom"
import { t } from "i18next"
import styles from "./BottomNavigation.module.scss"
import Icon from "@/components/common/Icon/Icon"
import { Avatar } from "@/components/common/Avatar/Avatar"
import type { BottomNavigationProps } from "./BottomNavigation.d"

// Иконки
import storeIcon from "@/static/icons/store.svg"
import cardsIcon from "@/static/icons/cards_star.svg"

export const BottomNavigation: FC<BottomNavigationProps> = ({
  paddingBottom = 0,
}) => {
  const isMarket = !!useMatch({ path: "/market/*" })
  const isMyNft = !!useMatch({ path: "/my-nft/*" })
  const isProfile = !!useMatch({ path: "/profile" })

  const handleNavClick = (e: React.MouseEvent, isCurrentPage: boolean) => {
    if (isCurrentPage) {
      e.preventDefault()
    }
  }

  return (
    <nav
      className={styles.tabbar}
      style={{ paddingBottom }}
      aria-label="Bottom navigation"
    >
      <NavLink
        to="/market"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        onClick={e => handleNavClick(e, isMarket)}
      >
        <Icon src={storeIcon} color={isMarket ? "active" : "default"} />
        <span>{t("market")}</span>
      </NavLink>
      <NavLink
        to="/my-nft"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        onClick={e => handleNavClick(e, isMyNft)}
      >
        <Icon src={cardsIcon} color={isMyNft ? "active" : "default"} />
        <span>{t("my_nft")}</span>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        onClick={e => handleNavClick(e, isProfile)}
      >
        <Avatar
          className={`${styles.avatar} ${isProfile ? styles.active : ""}`}
        />
        <span>{t("profile")}</span>
      </NavLink>
    </nav>
  )
}
