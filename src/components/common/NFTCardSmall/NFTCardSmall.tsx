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
  priceTrend,
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
  const [editValue, setEditValue] = useState<number>(price)

  // форматирование (можете заменить на ваш форматтер)
  const fmt = (v: number) => String(v)

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
            styles.checkboxCustom,
            !inStock ? styles.disabled : "",
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
              type="number"
              min={0}
              value={editValue}
              onChange={e => setEditValue(Number(e.target.value))}
              onBlur={() => onPriceChange?.(editValue)}
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
