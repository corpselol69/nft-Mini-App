import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  type?: "primary" | "secondary" | "card-price" | "vertical" | "text" | "icon";
  isDisabled?: boolean;
  size?: "small" | "medium" | "large";
}
