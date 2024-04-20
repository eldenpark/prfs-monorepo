import React from "react";
import cn from "classnames";
import { FaKey } from "@react-icons/all-files/fa/FaKey";
import { RandKeyPairType } from "@taigalabs/prfs-id-sdk-web";

import styles from "./RandKeyPairItem.module.scss";
import { useI18N } from "@/i18n/context";
import {
  QueryItem,
  QueryItemLeftCol,
  QueryItemMeta,
  QueryItemRightCol,
} from "@/components/default_module/QueryItem";

const RandKeyPairItem: React.FC<RandKeyPairItemProps> = ({ name, skHex, pkHex, val, type }) => {
  const i18n = useI18N();

  return (
    <QueryItem sidePadding>
      <QueryItemMeta>
        <QueryItemLeftCol>
          <FaKey />
        </QueryItemLeftCol>
        <QueryItemRightCol>
          <div className={styles.name}>{name}</div>
          <div className={styles.val}>Value: {val}</div>
          <div className={styles.type}>({type})</div>
          <div className={styles.hashed}>
            <span className={styles.label}>{i18n.public_key}: </span>
            <span>{pkHex}</span>
          </div>
        </QueryItemRightCol>
      </QueryItemMeta>
    </QueryItem>
  );
};

export default RandKeyPairItem;

export interface RandKeyPairItemProps {
  name: string;
  skHex: string;
  pkHex: string;
  val: string;
  type: RandKeyPairType;
}
