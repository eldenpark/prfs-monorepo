"use client";

import React from "react";
import cn from "classnames";
import Input from "@taigalabs/prfs-react-lib/src/input/Input";
import Button from "@taigalabs/prfs-react-lib/src/button/Button";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { atstApi, prfsApi3 } from "@taigalabs/prfs-api-js";
import { useMutation } from "@taigalabs/prfs-react-lib/react_query";
import { useRouter } from "next/navigation";
import ConnectWallet from "@taigalabs/prfs-react-lib/src/connect_wallet/ConnectWallet";
import colors from "@taigalabs/prfs-react-lib/src/colors.module.scss";
import { ErrorBox } from "@taigalabs/prfs-react-lib/src/error_box/ErrorBox";
import Spinner from "@taigalabs/prfs-react-lib/src/spinner/Spinner";
import { FetchCryptoAssetRequest } from "@taigalabs/prfs-entities/bindings/FetchCryptoAssetRequest";
import { CryptoAsset } from "@taigalabs/prfs-entities/bindings/CryptoAsset";
import { GetLeastRecentPrfsIndexRequest } from "@taigalabs/prfs-entities/bindings/GetLeastRecentPrfsIndexRequest";
import { AddPrfsIndexRequest } from "@taigalabs/prfs-entities/bindings/AddPrfsIndexRequest";
import HoverableText from "@taigalabs/prfs-react-lib/src/hoverable_text/HoverableText";
import { toUtf8Bytes } from "@taigalabs/prfs-crypto-js";
import { utils as walletUtils } from "@taigalabs/prfs-crypto-deps-js/ethers";
import { CreatePrfsAttestationRequest } from "@taigalabs/prfs-entities/bindings/CreatePrfsAttestationRequest";

import styles from "./CreateGroupMemberAtst.module.scss";
import {
  AttestationsHeader,
  AttestationsHeaderRow,
  AttestationsTitle,
} from "@/components/attestations/AttestationComponents";
import {
  AttestationFormBtnRow,
  AttestationListItem,
  AttestationListItemDesc,
  AttestationListItemDescTitle,
  AttestationListItemNo,
  AttestationListRightCol,
} from "@/components/create_attestation/CreateAtstComponents";
import { paths } from "@/paths";
import {
  CryptoAssetSizeAtstFormData,
  SIGNATURE,
  CM,
  WALLET_ADDR,
} from "./create_crypto_asset_atst";
import SignatureItem from "./SignatureItem";
import ClaimSecretItem from "./ClaimSecretItem";
import { useI18N } from "@/i18n/use_i18n";

enum Status {
  Standby,
  InProgress,
}

function checkIfFormIsFilled(formData: CryptoAssetSizeAtstFormData) {
  if (formData[WALLET_ADDR].length < 1) {
    return false;
  }
  if (formData[CM].length < 1) {
    return false;
  }
  if (formData[SIGNATURE].length < 1) {
    return false;
  }

  return true;
}

const CreateGroupMemberAtst: React.FC<CreateMemberAtstProps> = () => {
  const i18n = useI18N();
  const [isNavigating, setIsNavigating] = React.useState(false);
  const [isSigValid, setIsSigValid] = React.useState(false);
  const [walletAddrEnc, setWalletAddrEnc] = React.useState<string | null>(null);
  const router = useRouter();
  const [formData, setFormData] = React.useState<CryptoAssetSizeAtstFormData>({
    [WALLET_ADDR]: "",
    [SIGNATURE]: "",
    [CM]: "",
  });
  const [walletCacheKeys, setWalletCacheKeys] = React.useState<Record<string, string> | null>(null);
  const [fetchAssetStatus, setFetchAssetStatus] = React.useState<Status>(Status.Standby);
  const [createStatus, setCreateStatus] = React.useState<Status>(Status.Standby);
  const [fetchAssetMsg, setFetchAssetMsg] = React.useState<React.ReactNode>(null);
  const [error, setError] = React.useState<React.ReactNode>(null);
  const [cryptoAssets, setCryptoAssets] = React.useState<CryptoAsset[] | null>(null);
  const { mutateAsync: getLeastRecentPrfsIndex } = useMutation({
    mutationFn: (req: GetLeastRecentPrfsIndexRequest) => {
      return prfsApi3({ type: "get_least_recent_prfs_index", prfs_indices: req.prfs_indices });
    },
  });
  const { mutateAsync: fetchCryptoAssetRequest } = useMutation({
    mutationFn: (req: FetchCryptoAssetRequest) => {
      return atstApi({ type: "fetch_crypto_asset", ...req });
    },
  });
  const { mutateAsync: addPrfsIndexRequest } = useMutation({
    mutationFn: (req: AddPrfsIndexRequest) => {
      return prfsApi3({ type: "add_prfs_index", ...req });
    },
  });
  const { mutateAsync: createCryptoSizeAtstRequest } = useMutation({
    mutationFn: (req: CreatePrfsAttestationRequest) => {
      return atstApi({ type: "create_crypto_asset_atst", ...req });
    },
  });

  const handleChangeWalletAddr = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;

      if (name === WALLET_ADDR) {
        setFormData(_ => ({
          [WALLET_ADDR]: value,
          [SIGNATURE]: "",
          [CM]: "",
        }));
      }

      if (cryptoAssets) {
        setCryptoAssets(null);
        setFetchAssetMsg(null);
      }
    },
    [setFormData, setCryptoAssets, cryptoAssets, setFetchAssetMsg],
  );

  const handleChangeCm = React.useCallback(
    (cm: string) => {
      if (cm?.length) {
        setFormData(oldVal => ({
          ...oldVal,
          [CM]: cm,
        }));
      }
    },
    [setFormData],
  );

  const handleClickFetchAsset = React.useCallback(async () => {
    const wallet_addr = formData[WALLET_ADDR];

    if (wallet_addr.length > 0) {
      if (!wallet_addr.startsWith("0x")) {
        setFetchAssetMsg(
          <span className={styles.error}>{i18n.wallet_address_should_start_with_0x}</span>,
        );
        return;
      }

      const req: FetchCryptoAssetRequest = {
        wallet_addr,
      };
      setFetchAssetStatus(Status.InProgress);
      const { payload, error } = await fetchCryptoAssetRequest(req);
      setFetchAssetStatus(Status.Standby);

      if (error) {
        console.error(error);
        setFetchAssetMsg(<span className={styles.error}>{error.toString()}</span>);
        return;
      }

      if (payload && payload.crypto_assets) {
        setCryptoAssets(payload.crypto_assets);
        setFetchAssetMsg(
          <span className={styles.success}>
            <FaCheck />
          </span>,
        );
      }
    }
  }, [
    fetchCryptoAssetRequest,
    formData[WALLET_ADDR],
    setCryptoAssets,
    setFetchAssetMsg,
    setFetchAssetStatus,
  ]);

  const handleClickStartOver = React.useCallback(() => {
    window.location.reload();
  }, [formData]);

  const handleChangeAddress = React.useCallback(
    (address: string) => {
      setFormData(oldVal => ({
        ...oldVal,
        [WALLET_ADDR]: address,
      }));
    },
    [setFormData],
  );

  const isFormFilled = React.useMemo(() => {
    return checkIfFormIsFilled(formData);
  }, [formData]);

  const handleClickCreate = React.useCallback(async () => {
    if (isFormFilled && createStatus === Status.Standby && walletCacheKeys && walletAddrEnc) {
      try {
        const sig = formData[SIGNATURE];
        const wallet_addr = formData[WALLET_ADDR];
        const cm = formData[CM];

        const cm_msg = toUtf8Bytes(cm);
        const recoveredAddr = walletUtils.verifyMessage(cm_msg, sig);

        if (recoveredAddr !== wallet_addr) {
          setError(<span>Signature is not valid</span>);
        }

        // For now, we don't obfuscate attestation id
        const atst_id = `ETH_${formData[WALLET_ADDR]}`;
        setError(null);

        if (atst_id) {
          setCreateStatus(Status.InProgress);

          const { payload: indexPayload, error: indexError } = await getLeastRecentPrfsIndex({
            prfs_indices: Object.values(walletCacheKeys),
          });

          if (indexError) {
            setError(<span>{indexError.toString()}</span>);
            setCreateStatus(Status.Standby);
            return;
          }

          let prfs_index = null;
          if (indexPayload) {
            prfs_index = indexPayload.prfs_index;
          } else {
            setError(<span>Wallet cache key is invalid. Something's wrong</span>);
            setCreateStatus(Status.Standby);
            return;
          }

          const wallet_addr = formData[WALLET_ADDR];
          const cm = formData[CM];
          const { payload, error } = await createCryptoSizeAtstRequest({
            atst_id,
            atst_type_id: "crypto_1",
            label: wallet_addr,
            serial_no: "empty",
            cm,
            cm_msg: Array.from(cm_msg),
            sig,
          });
          setCreateStatus(Status.Standby);

          if (error) {
            setError(<span>{error.toString()}</span>);
            setCreateStatus(Status.Standby);
            return;
          }

          if (payload) {
            setIsNavigating(true);
            router.push(paths.attestations__crypto_asset);
          }

          await addPrfsIndexRequest({
            key: prfs_index,
            value: walletAddrEnc,
            serial_no: "empty",
          });
        }
      } catch (err: any) {
        setError(<span>{err.toString()}</span>);
        setCreateStatus(Status.Standby);
      }
    }
  }, [
    formData,
    cryptoAssets,
    setIsNavigating,
    createCryptoSizeAtstRequest,
    setError,
    setCreateStatus,
    getLeastRecentPrfsIndex,
    router,
    walletCacheKeys,
    addPrfsIndexRequest,
    walletAddrEnc,
  ]);

  return isNavigating ? (
    <div className={styles.sidePadding}>{i18n.not_available}...</div>
  ) : (
    <>
      <AttestationsHeader>
        <AttestationsHeaderRow>
          <AttestationsTitle>{i18n.create_member_attestation}</AttestationsTitle>
        </AttestationsHeaderRow>
      </AttestationsHeader>
      <div>
        <form>
          <ol>
            <AttestationListItem>
              <AttestationListItemNo>1</AttestationListItemNo>
              <AttestationListRightCol>
                <AttestationListItemDesc>
                  <AttestationListItemDescTitle>
                    {i18n.what_group_are_you_a_member_of}
                  </AttestationListItemDescTitle>
                  <p>{i18n.wallet_address_example_given}</p>
                </AttestationListItemDesc>
                <div className={styles.content}>
                  <div className={styles.inputBtnRow}>
                    <ConnectWallet handleChangeAddress={handleChangeAddress}>
                      <button className={styles.inputBtn} type="button">
                        <HoverableText>{i18n.connect}</HoverableText>
                      </button>
                    </ConnectWallet>
                    <span> or paste your wallet address</span>
                  </div>
                  <Input
                    className={styles.input}
                    name={WALLET_ADDR}
                    error={""}
                    label={i18n.wallet_address}
                    value={formData.wallet_addr}
                    handleChangeValue={handleChangeWalletAddr}
                  />
                  <div className={styles.btnRow}>
                    <button type="button" onClick={handleClickFetchAsset} className={styles.btn}>
                      <HoverableText disabled={formData.wallet_addr.length === 0}>
                        {i18n.what_do_i_have}
                      </HoverableText>
                    </button>
                    <div className={styles.msg}>
                      {fetchAssetStatus === Status.InProgress && (
                        <Spinner size={14} color={colors.gray_32} borderWidth={2} />
                      )}
                      {fetchAssetMsg}
                    </div>
                  </div>
                  {cryptoAssets?.length && (
                    <div className={styles.cryptoAsset}>
                      <div className={styles.item}>
                        <p className={styles.label}>{i18n.wallet_address}:</p>
                        <p className={styles.value}>{formData[WALLET_ADDR]}</p>
                      </div>
                      <div className={styles.item}>
                        <p className={styles.label}>{i18n.amount}:</p>
                        <p className={styles.value}>{cryptoAssets[0].amount.toString()}</p>
                      </div>
                      <div className={styles.item}>
                        <p className={styles.label}>{i18n.unit}:</p>
                        <p className={styles.value}>{cryptoAssets[0].unit}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AttestationListRightCol>
            </AttestationListItem>
            <ClaimSecretItem
              formData={formData}
              handleChangeCm={handleChangeCm}
              setWalletCacheKeys={setWalletCacheKeys}
              setWalletAddrEnc={setWalletAddrEnc}
              walletCacheKeys={walletCacheKeys}
              walletAddrEnc={walletAddrEnc}
            />
            <SignatureItem
              formData={formData}
              setFormData={setFormData}
              setIsSigValid={setIsSigValid}
            />
          </ol>
          <AttestationFormBtnRow>
            <div className={styles.createBtnRow}>
              <Button
                variant="transparent_blue_3"
                noTransition
                rounded
                handleClick={handleClickStartOver}
                type="button"
              >
                {i18n.start_over}
              </Button>
              <Button
                variant="blue_3"
                rounded
                noTransition
                contentClassName={styles.createBtn}
                handleClick={handleClickCreate}
                noShadow
                type="button"
                disabled={!isFormFilled || createStatus === Status.InProgress}
              >
                <span>{i18n.create}</span>
                {createStatus === Status.InProgress && (
                  <Spinner size={14} borderWidth={2} color={colors.white_100} />
                )}
              </Button>
            </div>
            {error && (
              <ErrorBox className={cn(styles.error)} rounded>
                {error}
              </ErrorBox>
            )}
          </AttestationFormBtnRow>
        </form>
      </div>
    </>
  );
};

export default CreateGroupMemberAtst;

export interface CreateMemberAtstProps {}
