import React from "react"
import styles from "./GiftImageWithText.module.scss"
import StickerAnimation from "@/components/common/Lottie/Lottie"

import SkeletonNode from "antd/es/skeleton/Node"

type Props = {
  background_url: string
  animation_url: string
  name: string
  number: number
}

export const GiftImageWithText: React.FC<Props> = ({
  background_url,
  animation_url,
  name,
  number,
}) => {
  return (
    <div className={styles.detailGiftSheetImageWrapper}>
      {background_url ? (
        <img className={styles.patternSvg} src={background_url} alt={name} />
      ) : (
        <SkeletonNode
          active
          className={styles.patternSvg}
          style={{
            position: "relative",
            width: 210,
            height: 210,
            borderRadius: 24,
          }}
        />
      )}

      <StickerAnimation file={animation_url} />

      <div className={styles.detailGiftSheetImageText}>
        {name && <span className={styles.detailGiftSheetName}>{name}</span>}
        {number && (
          <span className={styles.detailGiftSheetSubName}>#{number}</span>
        )}
      </div>
    </div>
  )
}
