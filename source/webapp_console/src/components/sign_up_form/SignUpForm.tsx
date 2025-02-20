import React from "react";
import { useConnect, metamaskWallet } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { prfsApi2 } from "@taigalabs/prfs-api-js";
import Button from "@taigalabs/prfs-react-components/src/button/Button";
import TextButton from "@taigalabs/prfs-react-components/src/text_button/TextButton";

import styles from "./SignUpForm.module.scss";
import ConnectWalletWidget from "@/components/connect_wallet_widget/ConnectWalletWidget";
import useLocalWallet from "@/hooks/useLocalWallet";
import { i18nContext } from "@/contexts/i18n";
import { FormTitle } from "@/components/form/Form";
import FormTextInput from "@/components/form/FormTextInput";
import { paths } from "@/paths";
import { useAppDispatch } from "@/state/hooks";

const metamaskConfig = metamaskWallet();

const SignUpForm: React.FC<SignUpFormProps> = () => {
  let i18n = React.useContext(i18nContext);
  const connect = useConnect();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useLocalWallet(dispatch);

  const [walletAddr, setWalletAddr] = React.useState("");
  const [hashAlert, setHashAlert] = React.useState("");
  const [passcode, setPasscode] = React.useState("");
  const [passcodeConfirm, setPasscodeConfirm] = React.useState("");
  const [passhash, setPasshash] = React.useState("");
  const [signUpAlert, setSignUpAlert] = React.useState("");

  const handleChangePasscode = React.useCallback(
    (ev: any) => {
      setPasscode(ev.target.value);
    },
    [setPasscode]
  );

  const handleChangePasscodeConfirm = React.useCallback(
    (ev: any) => {
      setPasscodeConfirm(ev.target.value);
    },
    [setPasscodeConfirm]
  );

  const handleClickHash = React.useCallback(() => {
    async function fn() {
      if (passcode.length < 0) {
        setHashAlert("Passcode is too short");
        setPasshash("");
        return;
      }

      if (passcode !== passcodeConfirm) {
        setHashAlert("Two passcodes are not identical");
        setPasshash("");
        return;
      }

      let prfs_pw_msg = `PRFS_PW_${passcode}`;
      let pw_hash = ethers.utils.hashMessage(prfs_pw_msg);

      setHashAlert("");
      setPasshash(pw_hash);
    }

    fn().then();
  }, [passcode, passcodeConfirm, setPasshash, setHashAlert]);

  const handleClickSignUp = React.useCallback(() => {
    async function fn() {
      if (walletAddr.length < 1) {
        setSignUpAlert("Connect a wallet first");
        return;
      }

      if (passhash.length < 1) {
        setSignUpAlert("Hash passcode first");
        return;
      }

      const wallet = await connect(metamaskConfig);
      const signer = await wallet.getSigner();
      const sig = await signer.signMessage(passhash);
      const avatar_color = Math.floor(Math.random() * 16777215).toString(16);

      try {
        const resp = await prfsApi2("sign_up_prfs_account", { account_id: sig, avatar_color });

        if (resp.error) {
          throw new Error(resp.error);
        }

        router.push(paths.signin);
      } catch (err) {
        setSignUpAlert(`sign up err, err: ${err}`);
      }
    }

    fn().then();
  }, [walletAddr, passhash, setSignUpAlert]);

  const handleClickSignIn = React.useCallback(() => {
    router.push("/signin");
  }, [router]);

  const handleConnect = React.useCallback(
    (addr: string) => {
      setWalletAddr(addr);
    },
    [setWalletAddr]
  );

  return (
    <div className={styles.wrapper}>
      <FormTitle>{i18n.sign_up}</FormTitle>
      <div className={styles.inputGroup}>
        <ConnectWalletWidget handleConnect={handleConnect} />
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.passcode}>
          <FormTextInput
            name="password"
            type="password"
            label={i18n.passcode}
            handleChange={handleChangePasscode}
          />
        </div>
        <div className={styles.passcode}>
          <FormTextInput
            name="password_confirm"
            type="password"
            label={i18n.passcode_confirm}
            handleChange={handleChangePasscodeConfirm}
          />
        </div>
        {hashAlert.length > 0 && <div className={styles.hashAlert}>{hashAlert}</div>}
        <div className={styles.hashBtnRow}>
          <Button variant="transparent_aqua_blue_1" handleClick={handleClickHash}>
            {i18n.hash}
          </Button>
        </div>
        {passhash && (
          <div className={styles.hashResult}>
            <FormTextInput label={i18n.passhash} name="passhash" value={passhash} />
          </div>
        )}
      </div>
      {signUpAlert.length > 0 && <div className={styles.signUpAlert}>{signUpAlert}</div>}
      <div className={styles.btnRow}>
        <div>
          <Button variant="aqua_blue_1" handleClick={handleClickSignUp}>
            {i18n.sign_up}
          </Button>
        </div>
        <div>
          <TextButton variant="aqua_blue_1" handleClick={handleClickSignIn}>
            {i18n.sign_in_to_existing}
          </TextButton>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

export interface SignUpFormProps {}
