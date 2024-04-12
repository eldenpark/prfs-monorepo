"use client";

import React from "react";
import { useRerender } from "@taigalabs/prfs-react-lib/src/hooks/use_rerender";
import { AlertContent, AlertWrapper } from "@taigalabs/prfs-react-lib/src/alert/AlertComponents";

import styles from "./CryptoAssetAtstList.module.scss";
import { i18nContext } from "@/i18n/context";
import CryptoSizeAtstTable from "./CryptoAssetAtstTable";
import { AppHeader, AppHeaderRow, AppTitle } from "@/components/app_components/AppComponents";
import { AttestationsTopMenu } from "@/components/sets/SetComponents";
import { useSignedInProofUser } from "@/hooks/user";
import ComputeTotalValueDialog from "./ComputeTotalValue";
import { isMasterAccount } from "@taigalabs/prfs-admin-credential";

const CryptoAssetAtstList: React.FC<CryptoSizeAtstListProps> = () => {
  const i18n = React.useContext(i18nContext);
  const { prfsProofCredential } = useSignedInProofUser();
  const { nonce, rerender } = useRerender();

  const isMaster = React.useMemo(() => {
    return isMasterAccount(prfsProofCredential?.account_id);
  }, [prfsProofCredential]);

  return (
    <>
      <AppHeader>
        <AppHeaderRow>
          <AppTitle className={styles.title}>{i18n.crypto_asset_attestations}</AppTitle>
          <AttestationsTopMenu>
            {isMaster && (
              <li>
                <ComputeTotalValueDialog credential={prfsProofCredential!} rerender={rerender} />
              </li>
            )}
          </AttestationsTopMenu>
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
        <CryptoSizeAtstTable nonce={nonce} />
      </div>
    </>
  );
};

export default CryptoAssetAtstList;

export interface CryptoSizeAtstListProps {}
