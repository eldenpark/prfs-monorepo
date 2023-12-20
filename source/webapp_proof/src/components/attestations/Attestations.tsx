"use client";

import React from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Attestations.module.scss";
import { i18nContext } from "@/i18n/context";
import { paths } from "@/paths";
import AttestationsMasthead from "@/components/attestations_masthead/AttestationsMasthead";
import { MastheadPlaceholder } from "@/components/masthead/Masthead";
import AttestationsLogoArea from "@/components/attestations_masthead/AttestationsLogoArea";
import LeftBar from "./LeftBar";
import LeftBarDrawer from "./LeftBarDrawer";
import { useSignedInUser } from "@/hooks/user";

export const AttestationsTitle: React.FC<AttestationsProps> = ({ children }) => {
  return <div className={styles.title}>{children}</div>;
};

export const AttestationsMain: React.FC<AttestationsProps> = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};

const Attestations: React.FC<AttestationsProps> = ({ children }) => {
  const i18n = React.useContext(i18nContext);
  const [isLeftBarVisible, setIsLeftBarVisible] = React.useState(true);
  const [isLeftBarDrawerVisible, setIsLeftBarDrawerVisible] = React.useState(false);
  const { isCredentialInitialized, prfsProofCredential } = useSignedInUser();
  const router = useRouter();

  React.useEffect(() => {
    if (isCredentialInitialized) {
      if (prfsProofCredential === null) {
        router.push(paths.accounts);
      }
    }
  }, [isCredentialInitialized, prfsProofCredential, router]);

  const handleClickShowLeftBar = React.useCallback(
    (open?: boolean) => {
      if (open !== undefined) {
        setIsLeftBarVisible(open);
      } else {
        setIsLeftBarVisible(v => !v);
      }
    },
    [setIsLeftBarVisible],
  );

  const handleClickShowLeftBarDrawer = React.useCallback(
    (open?: boolean) => {
      if (open !== undefined) {
        setIsLeftBarDrawerVisible(open);
      } else {
        setIsLeftBarDrawerVisible(v => !v);
      }
    },
    [setIsLeftBarDrawerVisible],
  );

  if (!isCredentialInitialized) {
    <div>Loading...</div>;
  }

  return (
    prfsProofCredential && (
      <>
        <AttestationsMasthead
          handleClickShowLeftBar={handleClickShowLeftBar}
          handleClickShowLeftBarDrawer={handleClickShowLeftBarDrawer}
        />
        <MastheadPlaceholder tallHeight />
        <div className={styles.wrapper}>
          <div className={cn(styles.leftBarContainer, { [styles.isVisible]: isLeftBarVisible })}>
            <LeftBar />
          </div>
          <LeftBarDrawer isOpen={isLeftBarDrawerVisible} setIsOpen={handleClickShowLeftBarDrawer}>
            <div className={styles.drawerLogoArea}>
              <AttestationsLogoArea handleClickShowLeftBar={handleClickShowLeftBar} />
            </div>
            <LeftBar />
          </LeftBarDrawer>
          {children}
        </div>
      </>
    )
  );
};

export default Attestations;

export interface AttestationsProps {
  children: React.ReactNode;
}
