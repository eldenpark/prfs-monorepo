import React from "react";
import cn from "classnames";
import { useQuery } from "@taigalabs/prfs-react-lib/react_query";
import { shyApi2 } from "@taigalabs/shy-api-js";
import { ShyChannel } from "@taigalabs/shy-entities/bindings/ShyChannel";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";

import styles from "./BoardMeta.module.scss";
import { useI18N } from "@/i18n/hook";
import Loading from "@/components/loading/Loading";

const BoardMeta: React.FC<BoardMetaProps> = ({ channel }) => {
  const i18n = useI18N();
  const [isDescOpen, setIsDescOpen] = React.useState(false);
  const handleClickToggleDesc = React.useCallback(() => {
    setIsDescOpen(b => !b);
  }, [setIsDescOpen]);

  const proofTypesElem = React.useMemo(() => {
    if (channel) {
      return channel.proof_type_ids.map(id => (
        <p className={styles.entry} key={id}>
          {id}
        </p>
      ));
    } else return null;
  }, [channel]);

  return channel ? (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.titleRow}>
          <div className={styles.label}>{channel.label}</div>
          <div className={styles.arrow} onClick={handleClickToggleDesc}>
            <IoIosArrowDown />
          </div>
        </div>
        <div className={cn(styles.descRow, { [styles.isVisible]: isDescOpen })}>
          <div className={styles.desc}>{channel.desc}</div>
          <div className={styles.proofTypeIds}>
            <p className={styles.title}>Requiring proofs of types</p>
            {proofTypesElem}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default BoardMeta;

export interface BoardMetaProps {
  channel: ShyChannel;
}
