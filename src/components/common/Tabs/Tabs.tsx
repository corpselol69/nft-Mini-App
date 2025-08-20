import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react"
import type { ReactElement } from "react"

import { NavLink, useLocation } from "react-router-dom"
import type { TabProps, TabsProps } from "./Tabs.d"
import cs from "classnames"

import styles from "./Tabs.module.scss"

export function Tab({
  to = "",
  children,
  type = "nav",
  selected,
  onClick,
}: TabProps) {
  if (type === "select") {
    return (
      <div
        className={cs(styles.tab, selected && styles.active)}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cs(styles.tab, isActive && styles.active)}
    >
      {children}
    </NavLink>
  )
}

export function Tabs({
  type = "nav",
  color = "primary",
  children,
  selected,
  onSelect,
}: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const location = type === "nav" ? useLocation() : undefined

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
  }, [type === "nav" ? location?.pathname : selected, , children])
  return (
    <div className={cs(styles.tabs, styles[color])} ref={containerRef}>
      <span className={styles.indicator} style={indicatorStyle} />
      {Children.map(children, child => {
        if (!isValidElement(child)) return child

        const key = child.props.to

        const extraProps =
          type === "select"
            ? {
                type,
                selected: key === selected,
                onClick: () => onSelect?.(key),
              }
            : { type }

        return cloneElement(child as ReactElement<TabProps>, extraProps)
      })}
    </div>
  )
}

Tabs.Tab = Tab
