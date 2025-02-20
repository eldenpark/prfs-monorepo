"use client";

import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Provider as StateProvider } from "react-redux";

import styles from "./DefaultLayout.module.scss";
import { store } from "@/state/store";
import { I18nProvider } from "@/contexts/i18n";
// import { StateProvider } from "@/contexts/state";
import Masthead from "@/components/masthead/Masthead";
import LeftBar from "@/components/left_bar/LeftBar";
import { i18nContext } from "@/contexts/i18n";

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Masthead />
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.leftBarContainer}>
            <LeftBar />
          </div>
          <div className={styles.contentArea}>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

export interface DefaultLayoutProps {
  children: React.ReactNode;
}
