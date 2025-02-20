import React, { MouseEventHandler } from "react";
import classnames from "classnames";

import styles from "./Button.module.scss";

function isTransparent(variant: Variant) {
  return (
    variant === "transparent_blue_1" ||
    variant === "transparent_black_1" ||
    variant === "transparent_aqua_blue_1" ||
    variant === "transparent_aqua_blue_1_light"
  );
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  handleClick,
  variant,
  disabled,
  name,
}) => {
  return (
    <button
      className={classnames({
        [styles.wrapper]: true,
        [styles.transparentBtn]: isTransparent(variant),
        [styles.aqua_blue_1]: variant === "aqua_blue_1",
        [styles.blue_1]: variant === "blue_1",
        [styles.transparent_blue_1]: variant === "transparent_blue_1",
        [styles.transparent_black_1]: variant === "transparent_black_1",
        [styles.transparent_aqua_blue_1]: variant === "transparent_aqua_blue_1",
        [styles.transparent_aqua_blue_1_light]: variant === "transparent_aqua_blue_1_light",
        [styles.white_gray_1]: variant === "white_gray_1",
        [styles.white_black_1]: variant === "white_black_1",
        [className || ""]: !!className,
      })}
      {...(name && { name })}
      onClick={handleClick}
      disabled={!!disabled}
    >
      {children}
    </button>
  );
};

export default Button;

export interface ButtonProps {
  variant: Variant;
  // | "aqua_blue_1"
  // | "blue_1"
  // | "transparent_blue_1"
  // | "transparent_black_1"
  // | "transparent_aqua_blue_1"
  // | "transparent_aqua_blue_1_light"
  // | "white_gray_1"
  // | "white_black_1";
  className?: string;
  name?: string;
  children: React.ReactNode;
  disabled?: boolean;
  handleClick?: MouseEventHandler;
}

export type Variant =
  | "aqua_blue_1"
  | "blue_1"
  | "transparent_blue_1"
  | "transparent_black_1"
  | "transparent_aqua_blue_1"
  | "transparent_aqua_blue_1_light"
  | "white_gray_1"
  | "white_black_1";
