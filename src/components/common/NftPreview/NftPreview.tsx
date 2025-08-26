import { FC } from "react"
import styles from "./NftPreview.module.scss"
import { NftPreviewProps } from "./NftPreview.d"
import cs from "classnames"

export const NftPreview: FC<NftPreviewProps> = ({
  background_url,
  preview_url,
  className,
}) => {
  return (
    <div
      className={cs(styles.preview, className)}
      style={{ backgroundImage: `url(${background_url})` }}
    >
      <img
        className={styles.pic}
        src={preview_url}
        alt={"nft preview"}
        draggable="false"
      />
    </div>
  )
}
