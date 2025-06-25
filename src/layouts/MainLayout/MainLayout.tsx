import { Outlet, NavLink, useLocation } from "react-router-dom";
import styles from "./MainLayout.module.scss";

export function MainLayout() {
  const { pathname } = useLocation();

  return (
    <div className={styles.root}>
      <main className={styles.content}>
        <Outlet />
      </main>

      <nav className={styles.tabbar} aria-label="Bottom navigation">
        <NavLink
          to="/market"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <span>Market</span>
        </NavLink>
        <NavLink
          to="/my-nft"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <span>My NFT</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}
