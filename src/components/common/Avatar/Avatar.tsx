import { FC } from "react"
import styles from "./Avatar.module.scss"
import { AvatarProps } from "./Avatar.d"

export const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <div
      className={styles.avatar}
      style={{ backgroundImage: src && `url(${src})` }}
    ></div>
  )
}
