import React from "react";
import cn from "classnames";

import styles from "./LeftBarComponents.module.scss";

export const LeftBarDrawerContainer: React.FC<LeftBarItemProps> = ({ children, className }) => {
  return <div className={cn(styles.leftBarDrawerContainer, className)}>{children}</div>;
};

export const LeftBarContainer: React.FC<LeftBarItemProps> = ({
  children,
  className,
  isVisible,
}) => {
  return (
    <div
      className={cn(styles.leftBarContainer, className, {
        [styles.isVisible]: isVisible,
      })}
    >
      {children}
    </div>
  );
};

export const LeftBarWrapper: React.FC<LeftBarItemProps> = ({ children, className }) => {
  return <div className={cn(styles.wrapper, className)}>{children}</div>;
};

export const LeftBarTopMenu: React.FC<LeftBarItemProps> = ({ children, className }) => {
  return <div className={cn(styles.topMenu, className)}>{children}</div>;
};

export const LeftBarItem: React.FC<LeftBarItemProps> = ({ children, className }) => {
  return <div className={cn(styles.item, className)}>{children}</div>;
};

export const LeftBarMenu: React.FC<LeftBarItemProps> = ({ children, className, category }) => {
  return (
    <div className={cn(styles.menu, className, { [styles.category]: category })}>{children}</div>
  );
};

export interface LeftBarItemProps {
  children: React.ReactNode;
  className?: string;
  isVisible?: boolean;
  category?: boolean;
}

export interface LeftBarItemButtonProps {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  disabled?: boolean;
}
