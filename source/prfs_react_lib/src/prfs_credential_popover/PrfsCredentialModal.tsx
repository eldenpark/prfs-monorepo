import React from "react";
import cn from "classnames";

import styles from "./PrfsCredentialModal.module.scss";
import { i18nContext } from "../i18n/i18nContext";

const PrfsCredentialModal: React.FC<ModalProps> = ({ id, handleClickSignOut }) => {
  const i18n = React.useContext(i18nContext);

  return (
    <div className={styles.modal}>
      <div className={styles.main}>
        <p className={styles.appId}>{i18n.id}</p>
        <p className={styles.id}>{id}</p>
      </div>
      <div className={styles.btnRow}>
        <button className={styles.signOutBtn} onClick={handleClickSignOut}>
          {i18n.sign_out}
        </button>
      </div>
    </div>
  );
};

export default PrfsCredentialModal;

export interface ModalProps {
  handleClickSignOut: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<any>>;
  id: string;
}
