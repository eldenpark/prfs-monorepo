import React from "react";
import Button from "@taigalabs/prfs-react-lib/src/button/Button";
import { PrfsIdCredential } from "@taigalabs/prfs-id-sdk-web";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { decrypt } from "@taigalabs/prfs-crypto-js";
import { abbrevMandN } from "@taigalabs/prfs-ts-utils";
import { makeDecryptKey } from "@taigalabs/prfs-crypto-js";

import styles from "./StoredCredentials.module.scss";
import { i18nContext } from "@/i18n/context";
import {
  DefaultErrorMsg,
  DefaultInnerPadding,
  DefaultInputItem,
  DefaultModuleBtnRow,
  DefaultModuleHeader,
  DefaultModuleSubtitle,
  DefaultModuleTitle,
} from "@/components/default_module/DefaultModule";
import {
  IdCreateForm,
  makeEmptyIDCreateFormErrors,
  makeEmptyIdCreateForm,
} from "@/functions/validate_id";
import { StoredCredentialRecord } from "@/storage/prfs_id_credential";
import {
  EphemeralPrfsIdCredential,
  persistEphemeralPrfsIdCredential,
} from "@/storage/ephe_credential";

export enum SignInStatus {
  Loading,
  Error,
  Standby,
}

const StoredCredentials: React.FC<StoredCredentialsProps> = ({
  storedCredentials,
  appId,
  handleClickUseAnotherId,
  handleSucceedSignIn,
  handleClickForgetAllCredentials,
  epheCredential,
}) => {
  const i18n = React.useContext(i18nContext);
  const [selectedCredentialId, setSelectedCredentialId] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<IdCreateForm>(makeEmptyIdCreateForm());
  const [formErrors, setFormErrors] = React.useState<IdCreateForm>(makeEmptyIDCreateFormErrors());

  React.useEffect(() => {
    if (Object.keys(storedCredentials).length < 1) {
      handleClickUseAnotherId();
    }
  }, [storedCredentials, handleClickUseAnotherId]);

  const handleChangeValue = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const name = ev.target.name;
      const val = ev.target.value;

      if (name) {
        setFormData(oldVal => {
          return {
            ...oldVal,
            [name]: val,
          };
        });
      }
    },
    [formData, setFormData],
  );

  const handleClickEntry = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const dataset = e.currentTarget.dataset;
      if (dataset.id) {
        if (epheCredential?.credential.id === dataset.id) {
          handleSucceedSignIn(epheCredential.credential);
        } else {
          setSelectedCredentialId(dataset.id);
        }
      }
    },
    [storedCredentials, setSelectedCredentialId, epheCredential, handleSucceedSignIn],
  );

  const handleClickNextWithCredential = React.useCallback(async () => {
    const credential = Object.values(storedCredentials).find(
      cred => cred.id === selectedCredentialId,
    );
    const password_2 = formData.password_2;
    setErrorMsg("");

    if (credential && password_2) {
      let decryptKey = await makeDecryptKey(password_2);
      let msg = Buffer.from(credential.credential);
      let credentialStr;
      try {
        credentialStr = decrypt(decryptKey.secret, msg).toString();
      } catch (err) {
        console.error(err);
        setErrorMsg("Can't decrypt persisted credential");
        return;
      }

      let credentialObj: PrfsIdCredential;
      try {
        credentialObj = JSON.parse(credentialStr);
      } catch (err) {
        console.error(err);
        setErrorMsg("Persisted credential is invalid");
        return;
      }

      if (!credentialObj.id) {
        setErrorMsg(`Persisted credential is corrupted, id: ${credentialObj.id}`);
        return;
      }

      if (!credentialObj.public_key) {
        setErrorMsg(`Persisted credential is corrupted, public_key: ${credentialObj.public_key}`);
        return;
      }

      if (!credentialObj.secret_key) {
        setErrorMsg(`Persisted credential is corrupted, secret_key: ${credentialObj.secret_key}`);
        return;
      }

      if (!credentialObj.encrypt_key) {
        setErrorMsg(
          `Persisted credential is corrupted, encrypted_key: ${credentialObj.encrypt_key}`,
        );
        return;
      }

      if (!credentialObj.local_encrypt_key) {
        setErrorMsg(
          `Persisted credential is corrupted, \
local_encrypt_key: ${credentialObj.local_encrypt_key}`,
        );
        return;
      }

      persistEphemeralPrfsIdCredential(credentialObj);
      handleSucceedSignIn(credentialObj);
    }
  }, [handleSucceedSignIn, formData, selectedCredentialId, setErrorMsg]);

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent) => {
      if (e.code === "Enter") {
        e.preventDefault();
        await handleClickNextWithCredential();
      }
    },
    [handleClickNextWithCredential],
  );

  const content = React.useMemo(() => {
    const elems = Object.values(storedCredentials).map(cred => {
      let id = "";
      if (cred.id.length > 14) {
        id = abbrevMandN(cred.id, 7, 5);
      } else {
        id = cred.id;
      }

      return (
        <li
          data-id={cred.id}
          key={cred.id}
          className={styles.entry}
          onClick={handleClickEntry}
          role="button"
        >
          <div className={styles.item}>
            <div className={styles.inner}>
              <div className={styles.idRow}>
                <p className={styles.prfsId}>{id}</p>
                {cred.id === epheCredential?.credential.id && (
                  <div className={styles.signedIn}>
                    <FaCheck />
                    <span>{i18n.signed_in}</span>
                  </div>
                )}
              </div>
              {cred.id === selectedCredentialId && (
                <div>
                  <DefaultInputItem
                    className={styles.passwordInput}
                    name="password_2"
                    value={formData.password_2}
                    placeholder={i18n.password_2}
                    error={formErrors.password_2}
                    handleChangeValue={handleChangeValue}
                    handleKeyDown={handleKeyDown}
                    type="password"
                  />
                  <Button
                    variant="blue_2"
                    type="button"
                    noTransition
                    noShadow
                    handleClick={handleClickNextWithCredential}
                  >
                    {i18n.next}
                  </Button>
                  {errorMsg && <DefaultErrorMsg>{errorMsg}</DefaultErrorMsg>}
                </div>
              )}
            </div>
          </div>
        </li>
      );
    });

    elems.push(
      <li key="sign_in" className={styles.entry} onClick={handleClickUseAnotherId} role="button">
        <div className={styles.item}>
          <div className={styles.inner}>
            <p className={styles.useAnotherId}>{i18n.use_another_id}</p>
          </div>
        </div>
      </li>,
    );

    return <ul className={styles.credList}>{elems}</ul>;
  }, [
    selectedCredentialId,
    formData,
    handleChangeValue,
    handleClickNextWithCredential,
    errorMsg,
    handleClickUseAnotherId,
    epheCredential,
  ]);

  const subtitle = React.useMemo(() => {
    return `${i18n.to_continue_to} ${appId}`;
  }, [appId]);

  return (
    <>
      {/* <DefaultTopLabel>{i18n.sign_in_with_prfs_id}</DefaultTopLabel> */}
      <DefaultInnerPadding noSidePadding>
        <DefaultModuleHeader noTopPadding>
          <DefaultModuleTitle>{i18n.choose_account}</DefaultModuleTitle>
          <DefaultModuleSubtitle>{subtitle}</DefaultModuleSubtitle>
        </DefaultModuleHeader>
        {content}
      </DefaultInnerPadding>
      <DefaultModuleBtnRow className={styles.btnRow}>
        <Button
          variant="transparent_blue_3"
          rounded
          noTransition
          handleClick={handleClickForgetAllCredentials}
          type="button"
        >
          {i18n.forget_all_accounts}
        </Button>
        <div />
      </DefaultModuleBtnRow>
    </>
  );
};

export default StoredCredentials;

export interface StoredCredentialsProps {
  storedCredentials: StoredCredentialRecord;
  appId: string;
  handleClickUseAnotherId: () => void;
  handleSucceedSignIn: (credential: PrfsIdCredential) => void;
  handleClickForgetAllCredentials: () => void;
  epheCredential: EphemeralPrfsIdCredential | null;
}
