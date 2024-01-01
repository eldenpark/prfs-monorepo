"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Spinner from "@taigalabs/prfs-react-components/src/spinner/Spinner";
import { PrfsIdCredential, parseProofGenSearchParams } from "@taigalabs/prfs-id-sdk-web";
import { usePrfsEmbed } from "@taigalabs/prfs-id-sdk-react";

import styles from "./ProofGen.module.scss";
import { i18nContext } from "@/i18n/context";
import {
  DefaultModule,
  DefaultForm,
  DefaultModuleFooter,
} from "@/components/default_module/DefaultModule";
import { envs } from "@/envs";
import PrfsIdErrorDialog from "@/components/error_dialog/PrfsIdErrorDialog";
import SignIn from "@/components/sign_in/SignIn";
// import CommitmentView from "./CommitmentView";

enum ProofGenStep {
  PrfsIdCredential,
  CommitmentView,
}

export enum Status {
  Loading,
  Error,
  Standby,
}

const ProofGen: React.FC = () => {
  const i18n = React.useContext(i18nContext);
  const [status, setStatus] = React.useState(Status.Loading);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const searchParams = useSearchParams();
  const [step, setStep] = React.useState(ProofGenStep.PrfsIdCredential);
  const [credential, setCredential] = React.useState<PrfsIdCredential | null>(null);
  const proofGenArgs = React.useMemo(() => {
    try {
      const args = parseProofGenSearchParams(searchParams as URLSearchParams);
      return args;
    } catch (err: any) {
      return null;
    }
  }, [searchParams]);
  const { prfsEmbed, isReady: isPrfsReady } = usePrfsEmbed();

  React.useEffect(() => {
    if (proofGenArgs) {
      const { publicKey, appId } = proofGenArgs;

      if (!publicKey) {
        setStatus(Status.Error);
        setErrorMsg("Invalid URL. 'public_key' is missing. Closing the window");
      } else if (!appId) {
        setStatus(Status.Error);
        setErrorMsg("Invalid URL. 'app_id' is missing. Closing the window");
      } else {
        if (isPrfsReady) {
          setStatus(Status.Standby);
        }
      }
    }
  }, [searchParams, setStatus, setErrorMsg, setStep, proofGenArgs, isPrfsReady]);

  const handleCloseErrorDialog = React.useCallback(() => {
    window.close();
  }, []);

  const handleClickPrev = React.useCallback(() => {
    setStep(ProofGenStep.PrfsIdCredential);
  }, [setStep]);

  const handleSucceedSignIn = React.useCallback(
    (credential: PrfsIdCredential) => {
      if (credential) {
        setCredential(credential);
        setStep(ProofGenStep.CommitmentView);
      }
    },
    [setCredential, setStep],
  );

  const content = React.useMemo(() => {
    if (!proofGenArgs) {
      return null;
    }

    switch (step) {
      case ProofGenStep.PrfsIdCredential: {
        return <SignIn appId={proofGenArgs.appId} handleSucceedSignIn={handleSucceedSignIn} />;
      }
      // case CommitmentStep.CommitmentView: {
      //   return (
      //     credential && (
      //       <CommitmentView
      //         credential={credential}
      //         commitmentArgs={commitmentArgs}
      //         handleClickPrev={handleClickPrev}
      //         prfsEmbed={prfsEmbed}
      //       />
      //     )
      //   );
      // }
      default:
        <div>Invalid step</div>;
    }
  }, [step, proofGenArgs]);

  return (
    <DefaultModule>
      <DefaultForm>
        {status === Status.Loading && (
          <div className={styles.overlay}>
            <Spinner color="#1b62c0" />
          </div>
        )}
        {status === Status.Error && (
          <PrfsIdErrorDialog errorMsg={errorMsg} handleClose={handleCloseErrorDialog} />
        )}
        {content}
      </DefaultForm>
      <DefaultModuleFooter>
        <Link href={envs.NEXT_PUBLIC_CODE_REPOSITORY_URL}>
          <span>{i18n.code}</span>
        </Link>
        <Link href={envs.NEXT_PUBLIC_WEBAPP_PROOF_ENDPOINT}>
          <span>{i18n.prfs}</span>
        </Link>
      </DefaultModuleFooter>
    </DefaultModule>
  );
};

export default ProofGen;
