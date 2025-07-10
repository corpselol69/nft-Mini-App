import type { FC } from "react"
import styles from "./ReferralLink.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "@/components/common/Icon/Icon"
import copyIcn from "@/static/icons/icn-copy.svg"
import qrCodeIcn from "@/static/icons/icn-qr_code.svg"

interface ReferralLinkProps {
  link: string
  onCopy: () => void
  copied: boolean
}

export const ReferralLink: FC<ReferralLinkProps> = ({
  link,
  onCopy,
  copied,
}) => {
  return (
    <div className={styles.referralLink}>
      <div className={styles.label}>Пригласительная ссылка</div>
      <div className={styles.linkContainer}>
        <span className={styles.link}>{link}</span>
        <div className={styles.actions}>
          <Button onClick={onCopy} type="icon">
            <Icon src={copyIcn} className={styles.icn} />
          </Button>
          <div className={styles.separator}></div>
          <Button type="icon">
            <Icon src={qrCodeIcn} className={styles.icn} />
          </Button>
        </div>
        {copied && <span className={styles.copiedAlert}>Скопировано!</span>}
      </div>
    </div>
  )
}
