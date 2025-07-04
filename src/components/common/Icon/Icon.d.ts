import { HTMLAttributes } from "react";

export interface IIconProps extends HTMLAttributes<HTMLSpanElement> {
  src: string;
  color?: "default" | "active";
  width?: number | string;
  height?: number | string;
  className?: string;
  opacity?: string
}
