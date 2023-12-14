"use client";

import React from "react";
import cn from "classnames";
import PrfsAppsPopover from "@taigalabs/prfs-react-components/src/prfs_apps_popover/PrfsAppsPopover";
import { useSearchParams } from "next/navigation";
import { PrfsAppsPopoverLi } from "@taigalabs/prfs-react-components/src/prfs_apps_popover/Modal";
import { TbCertificate } from "@taigalabs/prfs-react-components/src/tabler_icons/TbCertificate";
import { TbMathPi } from "@taigalabs/prfs-react-components/src/tabler_icons/TbMathPi";

import styles from "./Masthead.module.scss";
import { i18nContext } from "@/i18n/context";
import { paths } from "@/paths";
import PrfsIdSignInBtn from "@/components/prfs_id_sign_in_btn/PrfsIdSignInBtn";
import { GrMonitor } from "@react-icons/all-files/gr/GrMonitor";

const Masthead: React.FC<MastheadProps> = () => {
  const i18n = React.useContext(i18nContext);
  const searchParams = useSearchParams();

  const [isTutorial, tutorialUrl] = React.useMemo(() => {
    if (searchParams.get("tutorial_id")) {
      return [true, paths.__];
    }
    return [false, `${paths.__}?tutorial_id=simple_hash`];
  }, [searchParams]);

  return (
    <div className={cn({ [styles.wrapper]: true, [styles.isTutorial]: isTutorial })}>
      <div className={styles.inner}>
        <ul className={styles.rightGroup}>
          <li className={cn(styles.menu, styles.underline, styles.tutorialBtn)}>
            <a href={tutorialUrl}>
              <span>{i18n.tutorial}</span>
            </a>
          </li>
          {/* <li className={cn(styles.menu, styles.underline)}> */}
          {/*   <Link href={paths.auth}>{i18n.auth}</Link> */}
          {/* </li> */}
          <li className={styles.menu}>
            <PrfsAppsPopover
              webappPollEndpoint={process.env.NEXT_PUBLIC_WEBAPP_POLL_ENDPOINT}
              webappProofEndpoint={process.env.NEXT_PUBLIC_WEBAPP_PROOF_ENDPOINT}
              webappConsoleEndpoint={process.env.NEXT_PUBLIC_WEBAPP_CONSOLE_ENDPOINT}
            >
              <PrfsAppsPopoverLi>
                <a href={process.env.NEXT_PUBLIC_WEBAPP_PROOF_ENDPOINT}>
                  <TbCertificate />
                  <span>{i18n.account_verification}</span>
                </a>
              </PrfsAppsPopoverLi>
              <PrfsAppsPopoverLi>
                <a href={process.env.NEXT_PUBLIC_WEBAPP_PROOF_ENDPOINT}>
                  <TbMathPi />
                  <span>{i18n.proof}</span>
                </a>
              </PrfsAppsPopoverLi>
              <PrfsAppsPopoverLi>
                <a href={process.env.NEXT_PUBLIC_WEBAPP_CONSOLE_ENDPOINT}>
                  <GrMonitor />
                  <span>{i18n.console}</span>
                </a>
              </PrfsAppsPopoverLi>
            </PrfsAppsPopover>
          </li>
          <li className={cn(styles.menu, styles.signInBtn)}>
            <PrfsIdSignInBtn />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Masthead;

export interface MastheadProps {}
