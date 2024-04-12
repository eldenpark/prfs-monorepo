"use client";

import React from "react";
import { useRerender } from "@taigalabs/prfs-react-lib/src/hooks/use_rerender";
import { AlertContent, AlertWrapper } from "@taigalabs/prfs-react-lib/src/alert/AlertComponents";
import { isMasterAccount } from "@taigalabs/prfs-admin-credential";

import styles from "./GroupMemberAtstList.module.scss";
import { i18nContext } from "@/i18n/context";
import { AppHeader, AppHeaderRow, AppTitle } from "@/components/app_components/AppComponents";
import { AppTopMenu } from "@/components/app_components/AppComponents";
import { useSignedInProofUser } from "@/hooks/user";
import ComputeValueDialog from "./ComputeValueDialog";
import GroupMemberAtstTable from "./GroupMemberAtstTable";

const GroupMemberAtstList: React.FC<CryptoSizeAtstListProps> = ({ atst_group_id }) => {
  const i18n = React.useContext(i18nContext);
  const { prfsProofCredential } = useSignedInProofUser();
  const { nonce, rerender } = useRerender();
  const isMaster = isMasterAccount(prfsProofCredential?.account_id);

  return (
    <>
      <AppHeader>
        <AppHeaderRow>
          <AppTitle className={styles.title}>{i18n.group_member_attestations}</AppTitle>
          <AppTopMenu className={styles.topMenu}>
            {isMaster && (
              <li>
                <ComputeValueDialog credential={prfsProofCredential!} rerender={rerender} />
              </li>
            )}
          </AppTopMenu>
        </AppHeaderRow>
        <AppHeaderRow>
          <AlertWrapper variant="warn" rounded>
            <AlertContent>
              Prfs attestation has been upgraded to version 0.2. Those that have created the older
              version (prior to 2024 Apr 03) should create an attestation again to continue to use
              it
            </AlertContent>
          </AlertWrapper>
        </AppHeaderRow>
      </AppHeader>
      <div>
        <GroupMemberAtstTable nonce={nonce} atst_group_id={atst_group_id} />
      </div>
    </>
  );
};

export default GroupMemberAtstList;

export interface CryptoSizeAtstListProps {
  atst_group_id: string;
}
