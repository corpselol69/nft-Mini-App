import styles from "./CartHeader.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "@/components/common/Icon/Icon"
import tonIcon from "@/static/icons/icn-S_ton.svg"

export function CartHeader({
  totalCount,
  totalValue,
}: {
  totalCount: number
  totalValue: number
}) {
  return (
    <div className={styles.cartHeader}>
      <span className={styles.headerTitle}>
        Корзина <span className={styles.headerQty}>({totalCount})</span>
      </span>
      <Button type="secondary" size="medium">
        <div className={styles.buttonContent}>
          {totalValue}
          <Icon src={tonIcon} color="active" />
        </div>
      </Button>
    </div>
  )
}
