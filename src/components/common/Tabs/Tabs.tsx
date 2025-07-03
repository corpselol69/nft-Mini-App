// src/components/ui/Tabs/Tabs.tsx
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import type { TabProps } from "./Tabs.d";
import cs from "classnames";

import styles from "./Tabs.module.scss";

export function Tab({ to, children }: TabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cs(styles.tab, isActive && styles.active)}
    >
      {children}
    </NavLink>
  );
}

export function Tabs({ children }: { children: ReactNode }) {
  return <div className={styles.tabs}>{children}</div>;
}

Tabs.Tab = Tab;
