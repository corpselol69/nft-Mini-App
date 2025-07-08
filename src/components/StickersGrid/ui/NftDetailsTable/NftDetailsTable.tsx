import styles from "./NftDetailsTable.module.scss"
import { useMemo } from "react"
import { DetailsTable } from "@/components/common/DetailsTable/DetailsTable"

import { PriceTooltip } from "@/components/common/PriceTooltip/PriceTooltip"

type NftDetailsProps = {
  collection: string
  number: string
  issued: string
  price: number
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
      <PriceTooltip price={price} />
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
