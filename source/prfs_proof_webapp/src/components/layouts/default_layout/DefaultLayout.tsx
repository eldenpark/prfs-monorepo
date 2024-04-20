import React from "react";
import cn from "classnames";

import styles from "./DefaultLayout.module.scss";

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, viewportHeight }) => {
  return (
    <div className={cn(styles.wrapper, { [styles.viewportHeight]: viewportHeight })}>
      {children}
    </div>
  );
};

export const DefaultBody: React.FC<DefaultBodyProps> = ({
  children,
  noMinWidth,
  className,
  overflowYHidden,
}) => {
  return (
    <div
      className={cn(styles.body, className, {
        [styles.noMinWidth]: noMinWidth,
        [styles.overflowYHidden]: overflowYHidden,
      })}
    >
      {children}
    </div>
  );
};

export const DefaultFooter: React.FC<DefaultLayoutProps> = ({ children }) => {
  return <div className={styles.footer}>{children}</div>;
};

export default DefaultLayout;

export interface DefaultLayoutProps {
  children: React.ReactNode;
  viewportHeight?: boolean;
}

export interface DefaultBodyProps {
  children: React.ReactNode;
  noMinWidth?: boolean;
  overflowYHidden?: boolean;
  className?: string;
}
