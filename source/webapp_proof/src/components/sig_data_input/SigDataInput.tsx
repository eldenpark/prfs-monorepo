import React from "react";
import cn from "classnames";
import { CircuitInput } from "@taigalabs/prfs-entities/bindings/CircuitInput";
import { FaSignature } from "@react-icons/all-files/fa/FaSignature";
import { bufferToHex, hashPersonalMessage, toBuffer } from "@ethereumjs/util";
import { useSignMessage } from "wagmi";

import styles from "./SigDataInput.module.scss";
import { i18nContext } from "@/contexts/i18n";
import { FormInput, FormInputTitleRow, InputWrapper } from "@/components/form_input/FormInput";
import { BufferHex, SigData } from "@taigalabs/prfs-driver-interface";

const ComputedValue: React.FC<ComputedValueProps> = ({ value }) => {
  const val = React.useMemo(() => {
    if (value && value.sig) {
      return value.sig.substring(0, 14) + "...";
    } else {
      return "";
    }
  }, [value]);

  return <div className={styles.computedValue}>{val}</div>;
};

const SigDataInput: React.FC<SigDataInputProps> = ({ circuitInput, value, setFormValues }) => {
  const i18n = React.useContext(i18nContext);
  const { signMessageAsync } = useSignMessage();

  const handleChangeRaw = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (value) {
        value.sig = "";
        value.msgHash = "0x0";
      }

      const newVal = ev.target.value;

      setFormValues(oldVals => {
        const oldVal = oldVals[circuitInput.name] || {};

        return {
          ...oldVals,
          [circuitInput.name]: {
            ...oldVal,
            msgRaw: newVal,
          },
        };
      });
    },
    [setFormValues, value]
  );

  const handleClickSign = React.useCallback(async () => {
    if (value) {
      const msgRaw = value.msgRaw;
      const msgHash = hashPersonalMessage(Buffer.from(msgRaw));
      const sig = await signMessageAsync({ message: msgRaw });

      const newValue: SigData = {
        msgRaw,
        msgHash: bufferToHex(msgHash) as BufferHex,
        sig,
      };

      setFormValues(oldVals => ({
        ...oldVals,
        [circuitInput.name]: newValue,
      }));
    }
  }, [value, setFormValues, signMessageAsync]);

  return (
    <FormInput>
      <FormInputTitleRow>
        <p>{circuitInput.label}</p>
      </FormInputTitleRow>
      <InputWrapper>
        <div className={styles.interactiveArea}>
          <input
            placeholder={circuitInput.desc}
            value={value?.msgRaw || ""}
            onChange={handleChangeRaw}
          />
          <div className={styles.btnGroup}>
            <button className={styles.connectBtn} onClick={handleClickSign}>
              {i18n.sign}
            </button>
          </div>
        </div>
        {value?.sig && <ComputedValue value={value} />}
      </InputWrapper>
    </FormInput>
  );
};

export default SigDataInput;

export interface SigDataInputProps {
  circuitInput: CircuitInput;
  value: SigData | undefined;
  error: string | undefined;
  setFormValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export interface ComputedValueProps {
  value: SigData | undefined;
}
