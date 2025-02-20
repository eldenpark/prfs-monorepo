import React from "react";

import styles from "./ZAuthLayout.module.scss";
// import { useAppSelector } from "@/state/hooks";

const ZAuthLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  // const { top, left } = useAppSelector(state => state.ui.innerPos);
  // const opacity = useAppSelector(state => state.ui.innerOpacity);

  return (
    <div
      className={styles.wrapper}
      style={
        {
          // position: "absolute",
          // top: `${top}px`,
          // left: `${left}px`,
          // opacity,
          // height: docHeight,
          // width: docWidth,
        }
      }
    >
      {children}
    </div>
  );
};

export default ZAuthLayout;

export interface DefaultLayoutProps {
  children: React.ReactNode;
  // docHeight: number;
  // docWidth: number;
}
