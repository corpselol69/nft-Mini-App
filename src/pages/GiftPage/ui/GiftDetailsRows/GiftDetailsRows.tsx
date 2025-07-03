import React, { ReactNode, useMemo } from "react"
import { Chip } from "@/components/common/Chip/Chip"
import styles from "./GiftDetailsRows.module.scss"
import { IGiftItem } from "@/components/GiftsGrid/types"
import { DetailsTable } from "@/components/common/DetailsTable/DetailsTable"

type RowProps = {
  gift: IGiftItem
  priceContent: ReactNode
}

export const GiftDetailsRows: React.FC<RowProps> = ({ gift, priceContent }) => {
  const rows = useMemo(() => {
    return [
      {
        label: "Модель",
        value: (
          <div className={styles.detailTableValueWrapper}>
            <span className={styles.detailTableValueText}>{gift.model}</span>{" "}
            <Chip>1,2%</Chip>
          </div>
        ),
      },
      {
        label: "Символ",
        value: (
          <div className={styles.detailTableValueWrapper}>
            <span className={styles.detailTableValueText}>{gift.symbol}</span>{" "}
            <Chip>0,2%</Chip>
          </div>
        ),
      },
      {
        label: "Фон",
        value: (
          <div className={styles.detailTableValueWrapper}>
            <span className={styles.detailTableValueText}>
              {gift.background}
            </span>{" "}
            <Chip>1,5%</Chip>
          </div>
        ),
      },
      { label: "Нижняя цена", value: `${gift.lowestPrice} TON` },
      { label: "Цена продажи", value: priceContent },
    ]
  }, [])

  return <DetailsTable rows={rows} />
}
