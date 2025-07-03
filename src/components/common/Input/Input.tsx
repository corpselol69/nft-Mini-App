import { FC } from "react";
import { IInputProps } from "./Input.d";
import styles from "./Input.module.scss";
import clsx from "classnames";

export const Input: FC<IInputProps> = ({ icon, className, ...props }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {icon && icon}
      <input className={styles.input} {...props} />
    </div>
  );
};
