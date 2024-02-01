"use client";

import React from "react";
import cn from "classnames";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import ButtonCircleContainer from "@taigalabs/prfs-react-lib/src/button_circle_container/ButtonCircleContainer";
import { atstApi, prfsApi2 } from "@taigalabs/prfs-api-js";
import { i18nContext } from "@/i18n/context";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import styles from "./SetElementDetail.module.scss";
import { paths } from "@/paths";
import {
  AttestationDetailBox,
  AttestationDetailBoxInner,
  AttestationDetailSection,
  AttestationDetailSectionRow,
  AttestationDetailSectionRowLabel,
  AttestationDetailTopMenuRow,
} from "@/components/attestation_detail/AttestationDetail";

const SetElementDetail: React.FC<SetElementDetailProps> = ({ element_label }) => {
  const i18n = React.useContext(i18nContext);
  const { isLoading, data, error } = useQuery({
    queryKey: ["get_prfs_set_element", element_label],
    queryFn: async () => {
      const { payload } = await prfsApi2("get_prfs_set_element", {
        // atst_id: atst_id,
      });
      // return payload;
    },
  });
  const atst = data?.prfs_crypto_asset_size_atst;
  const cryptoAssets = React.useMemo(() => {
    return atst && JSON.stringify(atst.crypto_assets);
  }, [atst?.crypto_assets]);
  const etherScanUrl = React.useMemo(() => {
    return atst && `https://etherscan.io/address/${atst.wallet_addr.toLowerCase()}`;
  }, [atst?.wallet_addr]);

  if (isLoading) {
    <div>Loading...</div>;
  }

  if (error) {
    <div>Fetch error: {error.toString()}</div>;
  }

  if (atst === undefined) {
    return <div>Loading...</div>;
  }

  return (
    atst && (
      <div className={styles.wrapper}>
        <AttestationDetailTopMenuRow>
          <Link href={paths.attestations__crypto_asset_size}>
            <ButtonCircleContainer>
              <FaArrowLeft />
            </ButtonCircleContainer>
          </Link>
        </AttestationDetailTopMenuRow>
        <div className={styles.avatarRow}>
          <div className={styles.rightCol}>
            <div className={styles.walletAddr}>{atst.wallet_addr}</div>
          </div>
        </div>
        <AttestationDetailSection className={styles.metaRow}>
          <AttestationDetailBox>
            <AttestationDetailBoxInner>
              <AttestationDetailSectionRow>
                <AttestationDetailSectionRowLabel>
                  {i18n.commitment}
                </AttestationDetailSectionRowLabel>
                <div className={cn(styles.commitment, styles.value)}>{atst.cm}</div>
              </AttestationDetailSectionRow>
              <AttestationDetailSectionRow>
                <AttestationDetailSectionRowLabel>
                  {i18n.document_url}
                </AttestationDetailSectionRowLabel>
                <div className={cn(styles.url, styles.value)}>
                  <a href={etherScanUrl} target="_blank">
                    {etherScanUrl}
                  </a>
                </div>
              </AttestationDetailSectionRow>
              <AttestationDetailSectionRow>
                <AttestationDetailSectionRowLabel>
                  {i18n.crypto_assets}
                </AttestationDetailSectionRowLabel>
                <div className={cn(styles.destination, styles.value)}>{cryptoAssets}</div>
              </AttestationDetailSectionRow>
              <AttestationDetailSectionRow>
                <AttestationDetailSectionRowLabel>
                  {i18n.attestation_type}
                </AttestationDetailSectionRowLabel>
                <div className={cn(styles.attestationType, styles.value)}>{atst.atst_type}</div>
              </AttestationDetailSectionRow>
              <AttestationDetailSectionRow>
                <AttestationDetailSectionRowLabel>
                  {i18n.commitment}
                </AttestationDetailSectionRowLabel>
                <div className={cn(styles.cm, styles.value)}>{atst.cm}</div>
              </AttestationDetailSectionRow>
              <AttestationDetailSectionRow>
                <AttestationDetailSectionRowLabel>{i18n.status}</AttestationDetailSectionRowLabel>
                <div className={cn(styles.status, styles.value)}>{atst.status}</div>
              </AttestationDetailSectionRow>
              <AttestationDetailSectionRow>
                <AttestationDetailSectionRowLabel>{i18n.on_chain}</AttestationDetailSectionRowLabel>
                <div className={cn(styles.onChain, styles.value)}>{i18n.not_available}</div>
              </AttestationDetailSectionRow>
              <AttestationDetailSectionRow>
                <AttestationDetailSectionRowLabel>
                  {i18n.notarized}
                </AttestationDetailSectionRowLabel>
                <div className={cn(styles.notarized, styles.value)}>{i18n.not_available}</div>
              </AttestationDetailSectionRow>
            </AttestationDetailBoxInner>
          </AttestationDetailBox>
        </AttestationDetailSection>
      </div>
    )
  );
};

export default SetElementDetail;

export interface SetElementDetailProps {
  element_label: string;
}
