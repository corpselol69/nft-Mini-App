import { Tooltip } from "@/components/common/Tooltip/Tooltip"
import styles from "./NftDetailsTable.module.scss"
import { QuestionMarkIcon } from "./QuestionMarkIcon"
import { useMemo } from "react"
import { DetailsTable } from "@/components/common/DetailsTable/DetailsTable"

type NftDetailsProps = {
  collection: string
  number: string
  issued: string
  price: string
}

export const NftDetailsTable = ({
  collection,
  number,
  issued,
  price,
}: NftDetailsProps) => {
  const priceContent = (
    <span className={styles.priceRow}>
      <span>{price} TON</span>
      <Tooltip
        content={
          <>
            <div className={styles.tooltipWrapper}>
              <div className={styles.tooltipLabel}>Базовая цена</div>
              <div className={styles.tooltipValue}>{price} TON</div>
            </div>
            <div className={styles.tooltipWrapper}>
              <div className={styles.tooltipLabel}>Цена с комиссией</div>
              <div className={styles.tooltipValue}>{price} TON</div>
            </div>
            <div className={styles.tooltipWrapper}>
              <div className={styles.tooltipLabel}>Цена продажи</div>
              <div className={styles.tooltipValue}>{price} TON</div>
            </div>
          </>
        }
      >
        <QuestionMarkIcon />
      </Tooltip>
    </span>
  )

  const rows = useMemo(() => {
    return [
      { label: "Коллекция", value: collection },
      { label: "Номер", value: number },
      { label: "Выпущено", value: issued },
      { label: "Цена", value: priceContent },
    ]
  }, [])
  return <DetailsTable rows={rows} />
}
