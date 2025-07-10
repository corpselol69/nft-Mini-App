import { FC } from "react"
import styles from "./Avatar.module.scss"
import { AvatarProps } from "./Avatar.d"
import cs from "classnames"

export const Avatar: FC<AvatarProps> = ({ src, className }) => {
  return (
    <div
      className={cs(styles.avatar, className)}
      style={{ backgroundImage: src && `url(${src})` }}
    ></div>
  )
}
