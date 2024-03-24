"use client";

import React from "react";
import classNames from "classnames";

import styles from "./PrfsLogo.module.scss";
import { i18nContext } from "../i18n/i18nContext";

const PrfsLogo: React.FC<LogoProps> = ({ variant, appName, beta }) => {
  const i18n = React.useContext(i18nContext);

  return (
    <div className={styles.wrapper}>
      <p
        className={classNames({
          [styles.simple]: variant === "simple",
          [styles.big]: variant === "big",
        })}
      >
        {i18n.prfs}
      </p>
      {appName && <p className={styles.appName}>{appName}</p>}
      {beta && <p className={styles.betaTag}>Beta</p>}
    </div>
  );
};

export default PrfsLogo;

export interface LogoProps {
  variant: "simple" | "big";
  appName?: string;
  beta?: boolean;
}
