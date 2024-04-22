import React from "react";
import cn from "classnames";
import { ProofPublicInput } from "@taigalabs/prfs-driver-interface";
import { PrfsProof } from "@taigalabs/prfs-entities/bindings/PrfsProof";
import { PublicInputMeta } from "@taigalabs/prfs-entities/bindings/PublicInputMeta";
import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";

import CaptionedImg from "../captioned_img/CaptionedImg";
import styles from "./ProofBanner.module.scss";
import QRDialog from "./QRDialog";
import { PrfsProofSyn1 } from "@taigalabs/prfs-entities/bindings/PrfsProofSyn1";

const ProofBanner: React.FC<ProofBannerProps> = ({ prfsProof, proofUrl, noBorder }) => {
  return (
    <div className={cn(styles.wrapper, { [styles.noBorder]: noBorder })}>
      <div className={styles.imgContainer}>
        <CaptionedImg img_url={prfsProof.img_url} img_caption={prfsProof.img_caption} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{prfsProof.proof_type_label}</div>
        <div className={styles.subtitle}>
          <div className={styles.proofLabel}>
            <span>{prfsProof.proof_identity_input}</span>
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <QRDialog data={proofUrl} />
      </div>
    </div>
  );
};

export default ProofBanner;

export interface ProofBannerProps {
  prfsProof: PrfsProofSyn1;
  proofUrl: string;
  noBorder?: boolean;
}
