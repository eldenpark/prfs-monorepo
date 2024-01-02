import React from "react";
import { PrfsProofType } from "@taigalabs/prfs-entities/bindings/PrfsProofType";
import { CircuitInput } from "@taigalabs/prfs-entities/bindings/CircuitInput";
import { ProveReceipt } from "@taigalabs/prfs-driver-interface";
import Button from "@taigalabs/prfs-react-components/src/button/Button";
import Spinner from "@taigalabs/prfs-react-components/src/spinner/Spinner";
import LoaderBar from "@taigalabs/prfs-react-components/src/loader_bar/LoaderBar";
import dayjs from "dayjs";
import cn from "classnames";
import { useSearchParams } from "next/navigation";
import { BiLinkExternal } from "@react-icons/all-files/bi/BiLinkExternal";
import { ProofGenElement } from "@taigalabs/prfs-sdk-web";
import colors from "@taigalabs/prfs-react-components/src/colors.module.scss";
import { IoMdAdd } from "@react-icons/all-files/io/IoMdAdd";
import { ProofGenArgs, makeProofGenSearchParams } from "@taigalabs/prfs-id-sdk-web/proof_gen";
import { PopupStatus, usePopup, usePrfsEmbed } from "@taigalabs/prfs-id-sdk-react";
import {
  API_PATH,
  QueryType,
  newPrfsIdMsg,
  parseBuffer,
  sendMsgToChild,
} from "@taigalabs/prfs-id-sdk-web";
import { decrypt } from "@taigalabs/prfs-crypto-js";

import styles from "./CreateProofModule.module.scss";
import { i18nContext } from "@/i18n/context";
import TutorialStepper from "@/components/tutorial/TutorialStepper";
import ProofTypeMeta from "@/components/proof_type_meta/ProofTypeMeta";
import { envs } from "@/envs";
import { useRandomKeyPair } from "@/hooks/key";
import { TbNumbers } from "@taigalabs/prfs-react-components/src/tabler_icons/TbNumbers";

const PROOF = "proof";

enum Status {
  Loading,
  Standby,
}

const CreateProofModule: React.FC<CreateProofModuleProps> = ({
  proofType,
  handleCreateProofResult,
  proofGenElement,
  setProofGenElement,
}) => {
  const i18n = React.useContext(i18nContext);
  const [systemMsg, setSystemMsg] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState(Status.Loading);
  const searchParams = useSearchParams();
  const { sk, pkHex } = useRandomKeyPair();
  const { openPopup } = usePopup();
  const isTutorial = React.useMemo(() => {
    if (searchParams.get("tutorial_id")) {
      return true;
    }
    return false;
  }, [searchParams]);
  const { prfsEmbed, isReady: isPrfsReady } = usePrfsEmbed();

  const handleClickCreateProof = React.useCallback(async () => {
    // const args: ProofGenArgs = {
    //   nonce: Math.random() * 100000000,
    //   appId: "prfs_proof",
    //   proofTypeId: proofType.proof_type_id,
    //   publicKey: pkHex,
    // };
    // const searchParams = makeProofGenSearchParams(args);
    // const endpoint = `${envs.NEXT_PUBLIC_PRFS_ID_WEBAPP_ENDPOINT}${API_PATH.proof_gen}${searchParams}`;
    // const child = window.open(endpoint, "_blank", "toolbar=0,location=0,menubar=0");
    // if (proofGenElement) {
    //   try {
    //     const inputs = await validateInputs(formValues, proofType, setFormErrors);
    //     if (inputs === null) {
    //       return;
    //     }
    //     if (createProofStatus === CreateProofStatus.InProgress) {
    //       return;
    //     }
    //     setCreateProofStatus(CreateProofStatus.InProgress);
    //     const proveReceipt = await proofGenElement.createProof(inputs, proofType.circuit_type_id);
    //     setCreateProofStatus(CreateProofStatus.Created);
    //     handleCreateProofResult(null, proveReceipt);
    //   } catch (error: unknown) {
    //     const err = error as Error;
    //     setCreateProofStatus(CreateProofStatus.Error);
    //     setSystemMsg(err.toString());
    //     handleCreateProofResult(err, null);
    //   }
    // }
    //
    const proofGenArgs: ProofGenArgs = {
      nonce: Math.random() * 1000000,
      appId: "prfs_proof",
      queries: [
        {
          name: PROOF,
          proofTypeId: proofType.proof_type_id,
          queryType: QueryType.CREATE_PROOF_TYPE,
        },
      ],
      publicKey: pkHex,
    };
    const searchParams = makeProofGenSearchParams(proofGenArgs);
    const endpoint = `${envs.NEXT_PUBLIC_PRFS_ID_WEBAPP_ENDPOINT}${API_PATH.proof_gen}${searchParams}`;

    openPopup(endpoint, async () => {
      if (!prfsEmbed || !isPrfsReady) {
        return;
      }

      const resp = await sendMsgToChild(
        newPrfsIdMsg("REQUEST_PROOF_GEN", { appId: proofGenArgs.appId }),
        prfsEmbed,
      );

      // if (resp) {
      //   try {
      //     const buf = parseBuffer(resp);
      //     let decrypted: string;
      //     try {
      //       decrypted = decrypt(sk.secret, buf).toString();
      //     } catch (err) {
      //       console.error("cannot decrypt payload", err);
      //       return;
      //     }
      //     let payload: CommitmentSuccessPayload;
      //     try {
      //       payload = JSON.parse(decrypted) as CommitmentSuccessPayload;
      //     } catch (err) {
      //       console.error("cannot parse payload", err);
      //       return;
      //     }
      //     const cm = payload.receipt[CLAIM];
      //     if (cm) {
      //       setClaimCm(cm);
      //       setStep(AttestationStep.POST_TWEET);
      //     } else {
      //       console.error("no commitment delivered");
      //       return;
      //     }
      //   } catch (err) {
      //     console.error(err);
      //   }
      // } else {
      //   console.error("Returned val is empty");
      // }
    });
  }, [
    // formValues,
    proofType,
    handleCreateProofResult,
    proofGenElement,
    setSystemMsg,
    status,
  ]);

  React.useEffect(() => {
    async function fn() {
      if (isPrfsReady) {
        setStatus(Status.Standby);
      }
      // const { circuit_driver_id, driver_properties } = proofType;
      // setLoadDriverStatus(LoadDriverStatus.InProgress);
      // setDriverMsg(<span>Loading driver {proofType.circuit_driver_id}...</span>);
      // const since = dayjs();
      //   try {
      //     const elem = (await prfsSDK.create("proof_gen", {
      //       proofTypeId: proofType.proof_type_id,
      //       circuit_driver_id,
      //       driver_properties,
      //       sdkEndpoint: process.env.NEXT_PUBLIC_PRFS_SDK_WEB_ENDPOINT,
      //     })) as ProofGenElement;
      //     elem.subscribe((ev: ProofGenEvent) => {
      //       const { type, payload } = ev;
      //       if (type === "LOAD_DRIVER_EVENT") {
      //         if (payload.asset_label && payload.progress) {
      //           setLoadDriverProgress(oldVal => ({
      //             ...oldVal,
      //             [payload.asset_label!]: payload.progress,
      //           }));
      //         }
      //       }
      //       if (type === "LOAD_DRIVER_SUCCESS") {
      //         const now = dayjs();
      //         const diff = now.diff(since, "seconds", true);
      //         const { artifactCount } = payload;
      //         setDriverMsg(
      //           <>
      //             <span>Circuit driver </span>
      //             <a
      //               href={`${envs.NEXT_PUBLIC_WEBAPP_CONSOLE_ENDPOINT}/circuit_drivers/${circuit_driver_id}`}
      //             >
      //               {proofType.circuit_driver_id} <BiLinkExternal />
      //             </a>
      //             <span>
      //               ({diff} seconds, {artifactCount} artifacts)
      //             </span>
      //           </>,
      //         );
      //         setLoadDriverStatus(LoadDriverStatus.Standby);
      //       }
      //       if (type === "CREATE_PROOF_EVENT") {
      //         setSystemMsg(payload.payload);
      //       }
      //     });
      //     setProofGenElement(elem);
      //     return elem;
      //   } catch (err) {
      //     setDriverMsg(`Driver init failed, id: ${circuit_driver_id}, err: ${err}`);
      //   }
    }
    fn().then();
  }, [proofType, setProofGenElement, setStatus, isPrfsReady, setSystemMsg]);

  return (
    <div className={cn(styles.wrapper, { [styles.isTutorial]: isTutorial })}>
      <div className={styles.systemMsg}></div>
      <div className={cn(styles.main, { [styles.isTutorial]: isTutorial })}>
        <div className={styles.moduleArea}>
          <div className={styles.moduleWrapper}>
            <div className={styles.desc}>
              <p className={styles.numberIcon}>
                <TbNumbers />
              </p>
              <p>{i18n.create_proof_desc}</p>
            </div>
            <div className={styles.btnRow}>
              {status === Status.Loading && <div className={styles.overlay} />}
              <TutorialStepper steps={[2]}>
                <button onClick={handleClickCreateProof} className={cn(styles.createBtn)}>
                  <IoMdAdd />
                  <span>{i18n.create_proof_with_prfs}</span>
                </button>
              </TutorialStepper>
            </div>
          </div>
        </div>
        <div className={styles.metaArea}>
          <ProofTypeMeta
            proofTypeDesc={proofType.desc}
            proofTypeId={proofType.proof_type_id}
            imgUrl={proofType.img_url}
            proofTypeLabel={proofType.label}
            proofTypeAuthor={proofType.author}
            circuitTypeId={proofType.circuit_type_id}
            circuitDriverId={proofType.circuit_driver_id}
            proofTypeCreatedAt={proofType.created_at}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProofModule;

export interface CreateProofModuleProps {
  proofType: PrfsProofType;
  handleCreateProofResult: (err: any, proveReceipt: ProveReceipt | null) => void;
  proofGenElement: ProofGenElement | null;
  setProofGenElement: React.Dispatch<React.SetStateAction<ProofGenElement | null>>;
}

export interface LoadDriverProgressProps {
  progress: Record<string, any>;
}
