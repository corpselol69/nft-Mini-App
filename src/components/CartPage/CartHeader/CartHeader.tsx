import styles from "./CartHeader.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "@/components/common/Icon/Icon"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import { useNavigate } from "react-router-dom"

export function CartHeader({
  totalCount,
  balance,
}: {
  totalCount: number
  balance: string
}) {
  const navigate = useNavigate()

  return (
    <div className={styles.cartHeader}>
      <span className={styles.headerTitle}>
        Корзина <span className={styles.headerQty}>({totalCount})</span>
      </span>
      <Button
        type="secondary"
        size="medium"
        onClick={() => navigate("/profile")}
      >
        <div className={styles.buttonContent}>
          {balance}
          <Icon src={tonIcon} color="active" />
        </div>
      </Button>
    </div>
  )
}
