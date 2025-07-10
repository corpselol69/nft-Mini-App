import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { NavLink, useLocation } from "react-router-dom"
import type { TabProps } from "./Tabs.d"
import cs from "classnames"

import styles from "./Tabs.module.scss"

export function Tab({ to, children }: TabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cs(styles.tab, isActive && styles.active)}
    >
      {children}
    </NavLink>
  )
}

export function Tabs({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const location = useLocation()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const active = container.querySelector(`.${styles.active}`)
    if (active instanceof HTMLElement) {
      setIndicatorStyle({
        width: `${active.offsetWidth}px`,
        transform: `translateX(${active.offsetLeft}px)`,
      })
    }
  }, [location.pathname, children])
  return (
    <div className={styles.tabs} ref={containerRef}>
      <span className={styles.indicator} style={indicatorStyle} />
      {Children.map(children, child =>
        isValidElement(child) ? cloneElement(child) : child
      )}
    </div>
  )
}

Tabs.Tab = Tab
