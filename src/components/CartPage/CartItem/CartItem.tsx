import styles from "./CartItem.module.scss"
import Icon from "@/components/common/Icon/Icon"
import { Button } from "@/components/common/Button/Button"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import icnLClose from "@/static/icons/icn-L_Close.svg"
import upwardIcon from "@/static/icons/arrow_upward_alt.svg"
import { Checkbox } from "@/components/common/Checkbox/Checkbox"
import monkeyImg from "@/static/placeholders/monkey.png"
import clsx from "classnames"

export function CartItem({
  item,
  //onRemove,
  onSelect,
  isDeleting,
  onRestore,
  setIsDeleting,
}: {
  item: any
  onRemove: (id: string) => void
  onSelect: (id: string, checked: boolean) => void
  isDeleting: boolean
  onRestore: (id: string) => void
  setIsDeleting: (v: boolean) => void
}) {
  return (
    <div className={styles.itemWrapper}>
      <Checkbox
        checked={item.selected}
        disabled={!item.inStock}
        onChange={e => onSelect(item.id, e.target.checked)}
        className={clsx(!item.inStock && styles.disabled)}
      />
      <div className={styles.imageWrapper}>
        <img src={monkeyImg} />
        {item.inStock && !isDeleting && (
          <Button
            className={clsx(styles.buttonIconClose, styles.absolute)}
            size="large"
            onClick={() => setIsDeleting(true)}
          >
            <Icon src={icnLClose} />
          </Button>
        )}
      </div>
      <div className={clsx(styles.itemDescription)}>
        <span
          className={clsx(
            styles.itemDescriptionTitle,
            !item.inStock && styles.disabled
          )}
        >
          {item.title}
        </span>
        {isDeleting ? (
          <span
            className={styles.restoreToCartText}
            onClick={() => {
              onRestore(item.id)
              setIsDeleting(false)
            }}
          >
            Вернуть в корзину
          </span>
        ) : (
          <span
            className={clsx(
              styles.itemDescriptionText,
              !item.inStock && styles.disabled
            )}
          >
            {item.inStock ? item.number : "Нет в наличии"}
          </span>
        )}
      </div>
      <div className={styles.itemPrice}>
        {item.oldPrice && item.inStock && (
          <span className={styles.oldPriceValue}>{item.oldPrice}</span>
        )}
        {item.oldPrice && item.price > item.oldPrice && (
          <div className={styles.upwardWrapper}>
            <Icon src={upwardIcon} className={styles.upwardIcon} />
            <span className={styles.priceText}>{item.price}</span>
            <Icon src={tonIcon} className={styles.priceIcon} />
          </div>
        )}
        {!item.inStock && !isDeleting && (
          <div className={styles.itemDeleteButtonWrapper}>
            <Button
              className={styles.buttonIconClose}
              size="large"
              onClick={() => setIsDeleting(true)}
            >
              <Icon src={icnLClose} />
            </Button>
          </div>
        )}
        {(!item.oldPrice || (item.price <= item.oldPrice && item.inStock)) && (
          <>
            <span className={styles.priceText}>{item.price}</span>
            <Icon src={tonIcon} className={styles.priceIcon} />
          </>
        )}
      </div>
    </div>
  )
}
