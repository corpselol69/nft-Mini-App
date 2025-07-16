import { FC } from "react"

import styles from "./QrCodeBottomSheet.module.scss"

interface QrCodeBottomSheetProps {
  qrCode: string
  link: string
  onCopy: () => void
}
export const QrCodeBottomSheet: FC<QrCodeBottomSheetProps> = ({
  qrCode,
  link,
  onCopy,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.qrCodeImage}>
        <img src={qrCode} />
      </div>

      <span className={styles.link} onClick={onCopy}>
        {link}
      </span>
    </div>
  )
}
