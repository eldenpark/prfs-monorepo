import React from "react";
import { PrfsProofType } from "@taigalabs/prfs-entities/bindings/PrfsProofType";
import { CircuitInput } from "@taigalabs/prfs-entities/bindings/CircuitInput";
import { LogEventType, ProveReceipt } from "@taigalabs/prfs-driver-interface";
import Button from "@taigalabs/prfs-react-components/src/button/Button";
import Spinner from "@taigalabs/prfs-react-components/src/spinner/Spinner";
import { PrfsSDK } from "@taigalabs/prfs-sdk-web";
import ProofGenElement from "@taigalabs/prfs-sdk-web/src/proof_gen_element/proof_gen_element";
import cn from "classnames";

import styles from "./CreateProofModule.module.scss";
import { i18nContext } from "@/contexts/i18n";
import MerkleProofInput from "@/components/merkle_proof_input/MerkleProofInput";
import SigDataInput from "@/components/sig_data_input/SigDataInput";
import { envs } from "@/envs";
import Passcode from "@/components/passcode/Passcode";
import { FormInput, FormInputTitleRow } from "@/components/form_input/FormInput";
import { validateInputs } from "@/validate";
import HashInput from "@/components/hash_input/HashInput";
import TutorialStepper from "@/components/tutorial/TutorialStepper";

const prfsSDK = new PrfsSDK("prfs-proof");

enum LoadDriverStatus {
  Loaded,
  InProgress,
}

enum CreateProofStatus {
  StandBy,
  InProgress,
  Created,
}

const CreateProofModule: React.FC<CreateProofModuleProps> = ({
  proofType,
  handleCreateProofResult,
  proofGenElement,
  setProofGenElement,
}) => {
  const i18n = React.useContext(i18nContext);
  const [driverMsg, setDriverMsg] = React.useState("Loading driver...");
  const [systemMsg, setSystemMsg] = React.useState<string>("");
  const [loadDriverStatus, setLoadDriverStatus] = React.useState(LoadDriverStatus.InProgress);
  const [createProofStatus, setCreateProofStatus] = React.useState(CreateProofStatus.StandBy);
  const [formValues, setFormValues] = React.useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const didTryInitialize = React.useRef(false);

  const handleChangeValue = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = ev.target;

      setFormValues(oldVals => {
        return {
          ...oldVals,
          [name]: ev.target.value,
        };
      });
    },
    [setFormValues],
  );

  const handleClickCreateProof = React.useCallback(async () => {
    if (proofGenElement) {
      try {
        const inputs = await validateInputs(formValues, proofType);

        setCreateProofStatus(CreateProofStatus.InProgress);

        const proveReceipt = await proofGenElement.createProof(inputs, proofType.circuit_type_id);
        setSystemMsg(`Proof created in ${proveReceipt.duration}ms`);

        setCreateProofStatus(CreateProofStatus.Created);

        handleCreateProofResult(null, proveReceipt);
      } catch (err) {
        handleCreateProofResult(err, null);
      }
    }
  }, [formValues, proofType, handleCreateProofResult, proofGenElement, setSystemMsg]);

  React.useEffect(() => {
    async function fn() {
      if (didTryInitialize.current) {
        return;
      }
      didTryInitialize.current = true;

      const { circuit_driver_id, driver_properties } = proofType;

      try {
        const elem = await prfsSDK.create("proof-gen", {
          proofTypeId: proofType.proof_type_id,
          circuit_driver_id,
          driver_properties,
          sdkEndpoint: process.env.NEXT_PUBLIC_PRFS_SDK_WEB_ENDPOINT,
        });

        elem.subscribe(({ type, data }) => {
          if (type === "LOAD_DRIVER_EVENT") {
            setDriverMsg(data);
          }

          if (type === "DRIVER_LOADED") {
            console.log("driver is loaded!!!");
            setLoadDriverStatus(LoadDriverStatus.Loaded);
          }

          if (type === "PROOF_GEN_EVENT") {
            setSystemMsg(data.msg);
          }
        });

        setProofGenElement(elem);
        return elem;
      } catch (err) {
        setDriverMsg(`Driver init failed, id: ${circuit_driver_id}, err: ${err}`);
      }
    }

    fn().then();
  }, [
    proofType,
    setProofGenElement,
    setCreateProofStatus,
    setDriverMsg,
    setLoadDriverStatus,
    setSystemMsg,
  ]);

  const circuitInputsElem = React.useMemo(() => {
    if (!proofGenElement) {
      return null;
    }

    const circuit_inputs = proofType.circuit_inputs as CircuitInput[];

    const entriesElem = [];
    for (const [idx, input] of circuit_inputs.entries()) {
      switch (input.type) {
        case "MERKLE_PROOF_1": {
          entriesElem.push(
            <MerkleProofInput
              key={idx}
              circuitInput={input}
              value={formValues[input.name] as any}
              error={formErrors[input.name]}
              setFormValues={setFormValues}
              setFormErrors={setFormErrors}
            />,
          );
          break;
        }
        case "SIG_DATA_1": {
          entriesElem.push(
            <SigDataInput
              key={idx}
              circuitInput={input}
              value={formValues[input.name] as any}
              error={formErrors[input.name]}
              setFormValues={setFormValues}
              setFormErrors={setFormErrors}
            />,
          );
          break;
        }
        case "HASH_DATA_1": {
          entriesElem.push(
            <HashInput
              key={idx}
              circuitInput={input}
              value={formValues[input.name] as any}
              error={formErrors[input.name]}
              setFormValues={setFormValues}
              setFormErrors={setFormErrors}
              proofGenElement={proofGenElement}
            />,
          );
          break;
        }
        case "PASSCODE": {
          entriesElem.push(
            <Passcode
              key={idx}
              circuitInput={input}
              value={formValues[input.name]}
              handleChangeValue={handleChangeValue}
            />,
          );
          break;
        }
        case "PASSCODE_CONFIRM": {
          entriesElem.push(
            <Passcode
              key={idx}
              circuitInput={input}
              value={formValues[input.name]}
              handleChangeValue={handleChangeValue}
            />,
          );

          entriesElem.push(
            <Passcode
              key={`${idx}-confirm`}
              confirm
              circuitInput={input}
              value={formValues[input.name]}
              handleChangeValue={handleChangeValue}
            />,
          );
          break;
        }
        default: {
          console.error(`Cannot handle circuit input of this type`);

          entriesElem.push(
            <FormInput key={idx}>
              <FormInputTitleRow>
                <p>{input.label}</p>
              </FormInputTitleRow>
              <input placeholder="Cannot handle circuit input of this type" />
            </FormInput>,
          );
        }
      }
    }

    return entriesElem;
  }, [proofType, formValues, setFormValues, proofGenElement]);

  if (!proofType) {
    return null;
  }

  console.log(44, systemMsg);

  return (
    <div className={styles.wrapper}>
      <TutorialStepper steps={[2]}>
        <div className={styles.form}>{circuitInputsElem}</div>
      </TutorialStepper>
      <div className={styles.btnRow}>
        {createProofStatus === CreateProofStatus.InProgress && (
          <div className={styles.spinnerWrapper}>
            <Spinner color="black" size={38} />
          </div>
        )}
        <Button
          variant="blue_1"
          handleClick={handleClickCreateProof}
          className={cn({
            [styles.inProgress]: createProofStatus === CreateProofStatus.InProgress,
          })}
        >
          {i18n.create.toUpperCase()}
        </Button>
      </div>
      <div className={styles.footer}>
        <div className={styles.msg}>{proofType.circuit_driver_id}</div>

        {loadDriverStatus === LoadDriverStatus.InProgress && (
          <div className={styles.msg}>{driverMsg}</div>
        )}

        <div className={styles.msg}>{systemMsg}</div>
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
