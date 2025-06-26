import styles from "./NftDetailsTable.module.scss"

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
  return (
    <div className={styles.table}>
      <div className={styles.row}>
        <div className={styles.label}>Коллекция</div>
        <div className={styles.value}>{collection}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Номер</div>
        <div className={styles.value}>{number}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Выпущено</div>
        <div className={styles.value}>{issued}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Цена</div>
        <div className={`${styles.value} ${styles.priceRow}`}>
          <span>{price} TON</span>
          {/* <button className={styles.iconButton}>
            <Info size={12} />
          </button> */}
        </div>
      </div>
    </div>
  )
}
