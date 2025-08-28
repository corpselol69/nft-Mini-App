import React, { useId, useMemo, useState } from "react"
import tonIcon from "@/static/icons/icn-S_ton.svg"

import styles from "./NFTCardSmall.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "../Icon/Icon"

import { NFTCardSmallProps } from "./NFTCardSmall.d"

import { Checkbox } from "@/components/common/Checkbox/Checkbox"
import icnLClose from "@/static/icons/icn-L_Close.svg"
import upwardIcon from "@/static/icons/arrow_upward_alt.svg"
import { Input } from "../Input/Input"

export const NFTCardSmall: React.FC<NFTCardSmallProps> = ({
  checkbox_style = "default",
  preview,
  title,
  subtitle,
  price,
  oldPrice,
  editablePrice,
  onPriceChange,
  inStock = true,
  isDeleting,
  selected,
  showCheckbox,
  deletable,
  currencyIconSrc,
  variant = "list",
  size = "m",
  onClick,
  onRemove,
  onRestore,
  onSelect,
  endSlot,
}) => {
  const id = useId()
  const [editValue, setEditValue] = useState<string>(
    price === 0 ? "" : String(price)
  )

  const fmt = (v: number) => String(v)

  const normalize = (raw: string) => {
    // запятая -> точка
    let v = raw.replace(/,/g, ".")

    // только цифры и точки
    v = v.replace(/[^\d.]/g, "")

    // оставить только первую точку
    v = v.replace(/\.(?=.*\.)/g, "")

    // если первый символ '0' и это единственный символ => заменяем на "."
    if (v === "0") return "."

    // если начинается с "0" и дальше цифра (не точка) — превращаем в десятичное: "05" -> ".5", "012" -> ".12"
    if (/^0\d/.test(v)) v = "." + v.slice(1)

    const parts = v.split(".")
    if (parts[1] != null) {
      parts[1] = parts[1].slice(0, 2)
      v = parts.join(".")
    }
    return v
  }

  const clampOnBlur = (s: string) => {
    // минималка 0.5, точку без цифр считаем 0
    if (s === "" || s === ".") return ".1"

    let n = parseFloat(s)
    if (Number.isNaN(n)) n = 0

    if (n > 0 && n < 0.1) n = 0.1
    return String(n)
  }

  const PriceIcon = useMemo(
    () => (
      <Icon src={currencyIconSrc || tonIcon} className={styles.priceIcon} />
    ),
    [currencyIconSrc]
  )

  const withOldPrice = typeof oldPrice === "number" && inStock
  const priceWentUp = withOldPrice && price > (oldPrice as number)

  const disabledCls = !inStock ? styles.disabled : ""

  return (
    <div
      className={[
        styles.root,
        styles[variant],
        styles[size],
        !inStock ? styles.outOfStock : "",
        isDeleting ? styles.isDeleting : "",
      ].join(" ")}
      role={onClick ? "button" : undefined}
      onClick={onClick}
    >
      {showCheckbox && (
        <Checkbox
          checked={!!selected}
          disabled={!inStock}
          onChange={e => onSelect?.(e.target.checked)}
          className={[
            checkbox_style === "custom" && styles.checkboxCustom,
            !inStock && styles.disabled,
          ].join(" ")}
        />
      )}

      <div className={styles.mediaWrapper}>
        {preview}
        {deletable && inStock && !isDeleting && (
          <Button
            className={[styles.buttonIconClose, styles.absolute].join(" ")}
            size="large"
            onClick={e => {
              e.stopPropagation()
              onRemove?.()
            }}
          >
            <Icon src={icnLClose} />
          </Button>
        )}
      </div>

      <div className={styles.meta}>
        <div className={styles.titles}>
          <span className={[styles.title, disabledCls].join(" ")}>{title}</span>
          {isDeleting ? (
            <span
              className={styles.restore}
              onClick={e => {
                e.stopPropagation()
                onRestore?.()
              }}
            >
              Вернуть в корзину
            </span>
          ) : (
            <span className={[styles.subtitle, disabledCls].join(" ")}>
              {inStock ? subtitle : "Нет в наличии"}
            </span>
          )}
        </div>

        <div className={styles.priceBlock}>
          {withOldPrice && (
            <span className={styles.oldPrice}>{fmt(oldPrice as number)}</span>
          )}

          {priceWentUp && (
            <div className={styles.trendRow}>
              <Icon src={upwardIcon} className={styles.trendIcon} />
              <span className={styles.priceText}>{fmt(price)}</span>
              {PriceIcon}
            </div>
          )}

          {!priceWentUp && inStock && !editablePrice && (
            <div className={styles.priceRow}>
              <span className={styles.priceText}>{fmt(price)}</span>
              {PriceIcon}
            </div>
          )}

          {editablePrice && inStock && (
            <Input
              id={id}
              type="text"
              inputMode="decimal"
              value={editValue.toString()}
              onChange={e => {
                const val = normalize(e.target.value)
                setEditValue(val)
              }}
              onKeyDown={e => {
                const allowed =
                  (e.key >= "0" && e.key <= "9") ||
                  e.key === "." ||
                  e.key === "," ||
                  [
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Home",
                    "End",
                    "Tab",
                  ].includes(e.key)
                if (!allowed) e.preventDefault()
              }}
              onBlur={() => {
                const next = clampOnBlur(editValue)
                setEditValue(next)
                onPriceChange?.(parseFloat(next))
              }}
              icon={PriceIcon}
              iconPosition="right"
              className={styles.priceInput}
            />
          )}

          {!inStock && !isDeleting && deletable && (
            <div className={styles.itemDeleteButtonWrapper}>
              <Button
                className={styles.buttonIconClose}
                size="large"
                onClick={e => {
                  e.stopPropagation()
                  onRemove?.()
                }}
              >
                <Icon src={icnLClose} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {endSlot && <div className={styles.endSlot}>{endSlot}</div>}
    </div>
  )
}
