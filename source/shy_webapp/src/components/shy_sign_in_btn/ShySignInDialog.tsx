import React from "react";
import cn from "classnames";
import {
  API_PATH,
  openPopup,
  ProofGenArgs,
  makeProofGenSearchParams,
  createSessionKey,
  AppSignInType,
  QueryType,
  AppSignInData,
  ProofGenSuccessPayload,
  AppSignInResult,
} from "@taigalabs/prfs-id-sdk-web";
import {
  useFloating,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  useId,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import { PrivateKey, createRandomKeyPair, decrypt, makeRandInt } from "@taigalabs/prfs-crypto-js";
import { usePrfsIdSession } from "@taigalabs/prfs-react-lib/src/prfs_id_session_dialog/use_prfs_id_session";
import Overlay from "@taigalabs/prfs-react-lib/src/overlay/Overlay";
import Spinner from "@taigalabs/prfs-react-lib/src/spinner/Spinner";
import Button from "@taigalabs/prfs-react-lib/src/button/Button";
import { useViewport } from "@taigalabs/prfs-react-lib/src/hooks/use_viewport";
import PrfsIdSessionDialog from "@taigalabs/prfs-react-lib/src/prfs_id_session_dialog/PrfsIdSessionDialog";
import { PrfsIdSession } from "@taigalabs/prfs-entities/bindings/PrfsIdSession";
import { MdPerson } from "@react-icons/all-files/md/MdPerson";

import styles from "./ShySignInDialog.module.scss";
import { useShyI18N } from "@/i18n";

const SIGN_IN = "SIGN_IN";

const ShySignInDialog: React.FC<SignInViaPrfsProps> = ({
  className,
  appId,
  handleSucceedSignIn,
  handleSignInError,
  prfsIdEndpoint,
}) => {
  const viewport = useViewport();
  const [isOpen, setIsOpen] = React.useState(false);
  const { refs, floatingStyles, context } = useFloating({
    strategy: "absolute",
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const dismiss = useDismiss(context);
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const i18n = useShyI18N();

  const {
    openPrfsIdSession,
    isPrfsDialogOpen,
    setIsPrfsDialogOpen,
    sessionKey,
    setSessionKey,
    sk,
    setSk,
  } = usePrfsIdSession();

  const handleClickSignIn = React.useCallback(async () => {
    const { sk, pkHex } = createRandomKeyPair();
    const session_key = createSessionKey();
    const proofGenArgs: ProofGenArgs = {
      nonce: makeRandInt(1000000),
      app_id: appId,
      queries: [
        {
          name: SIGN_IN,
          type: AppSignInType.EC_SECP256K1,
          queryType: QueryType.APP_SIGN_IN,
          appSignInData: [AppSignInData.ID_POSEIDON],
        },
      ],
      public_key: pkHex,
      session_key,
    };

    const searchParams = makeProofGenSearchParams(proofGenArgs);
    const endpoint = `${prfsIdEndpoint}${API_PATH.proof_gen}${searchParams}`;

    const popup = openPopup(endpoint);
    if (!popup) {
      return;
    }

    const { payload: _ } = await openPrfsIdSession({
      key: proofGenArgs.session_key,
      value: null,
      ticket: "TICKET",
    });
    setIsPrfsDialogOpen(true);
    setSessionKey(proofGenArgs.session_key);
    setSk(sk);
  }, [
    prfsIdEndpoint,
    handleSucceedSignIn,
    setSk,
    openPrfsIdSession,
    setSessionKey,
    setIsPrfsDialogOpen,
  ]);

  const handleSucceedGetSession = React.useCallback(
    (session: PrfsIdSession) => {
      if (!sk) {
        handleSignInError("Secret key is not set to decrypt Prfs ID session");
        return;
      }

      const buf = Buffer.from(session.value);
      let decrypted: string;
      try {
        decrypted = decrypt(sk.secret, buf).toString();
      } catch (err) {
        handleSignInError(`Cannot decrypt payload, err: ${err}`);
        return;
      }

      let payload: ProofGenSuccessPayload;
      try {
        payload = JSON.parse(decrypted) as ProofGenSuccessPayload;
      } catch (err) {
        handleSignInError(`Cannot parse proof payload, err: ${err}`);
        return;
      }

      const signInResult: AppSignInResult = payload.receipt[SIGN_IN];
      if (signInResult) {
        handleSucceedSignIn(signInResult);
      } else {
        handleSignInError(`appSignInResult is void, session_key: ${sessionKey}`);
        return;
      }
    },
    [sk, sessionKey, handleSucceedSignIn, handleSignInError],
  );

  console.log(22, floatingStyles);

  return (
    <>
      <div className={cn(styles.base, className)} ref={refs.setReference} {...getReferenceProps()}>
        power123123
        {/* <button type="button" onClick={handleClickSignIn} className={styles.signInBtn}> */}
        {/*   <MdPerson /> */}
        {/* </button> */}
      </div>
      {isOpen && (
        <FloatingOverlay className={styles.overlay}>
          <FloatingFocusManager context={context}>
            <div
              className={styles.modal}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              power
              {/* <RawValueModal */}
              {/*   label={label} */}
              {/*   handleClickClose={handleClickClose} */}
              {/*   handleClickSubmit={handleClickSubmit} */}
              {/* /> */}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
      <PrfsIdSessionDialog
        sessionKey={sessionKey}
        isPrfsDialogOpen={isPrfsDialogOpen}
        setIsPrfsDialogOpen={setIsPrfsDialogOpen}
        actionLabel={i18n.sign_in}
        handleSucceedGetSession={handleSucceedGetSession}
      />
    </>
  );
};

export default ShySignInDialog;

export interface SignInViaPrfsProps {
  className?: string;
  label?: string;
  appId: string;
  // isLoading?: boolean;
  handleSucceedSignIn: (signInResult: AppSignInResult) => void;
  handleSignInError: (err: string) => void;
  prfsIdEndpoint: string;
}
