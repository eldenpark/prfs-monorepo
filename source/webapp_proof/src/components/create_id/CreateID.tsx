"use client";

import React from "react";

import styles from "./CreateID.module.scss";
import { i18nContext } from "@/contexts/i18n";
import SignInModule, {
  SignInInputGuide,
  SignInInputItem,
  SignInModuleBtnRow,
  SignInModuleHeader,
  SignInModuleInputArea,
  SignInModuleLogoArea,
  SignInModuleSubtitle,
  SignInModuleTitle,
} from "@/components/sign_in_module/SignInModule";
import Button from "@taigalabs/prfs-react-components/src/button/Button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { paths } from "@/paths";
import { IdForm, idFormEmpty, validateIdForm } from "@/functions/validate_id";

function switchCreateIdModule() {
  return null;
}

const CreateID: React.FC = () => {
  const i18n = React.useContext(i18nContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = React.useState<IdForm>(idFormEmpty);
  const [formErrors, setFormErrors] = React.useState<IdForm>(idFormEmpty);

  React.useEffect(() => {
    const step = searchParams.get("step");

    if (step === null) {
      const search = `?${searchParams.toString()}&step=1`;
      router.push(search);
    }
    // return step;
  }, [router, searchParams]);
  // console.log(33, step);

  const handleChangeValue = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const name = ev.target.name;
      const val = ev.target.value;

      if (name) {
        setFormData(oldVal => {
          return {
            ...oldVal,
            [name]: val,
          };
        });
      }
    },
    [formData, setFormData],
  );

  const handleClickNext = React.useCallback(() => {
    const res = validateIdForm(formData, setFormErrors);

    if (res) {
      const s = searchParams.toString();
      console.log(111, s);
      // router.
    }
  }, [formData, setFormErrors, router, searchParams]);

  const emailGuideURL = React.useMemo(() => {
    const url = `${process.env.NEXT_PUBLIC_DOCS_WEBSITE_ENDPOINT}/zauth`;

    return url;
  }, []);

  return (
    <div className={styles.wrapper}>
      <SignInModule>
        <SignInModuleLogoArea />
        <div>
          {switchCreateIdModule()}
          <SignInModuleHeader>
            <SignInModuleTitle>{i18n.create_zauth_identity}</SignInModuleTitle>
          </SignInModuleHeader>
          <SignInModuleInputArea>
            <div className={styles.inputGroup}>
              <SignInInputItem
                name="email"
                placeholder={i18n.email}
                error={formErrors.email}
                handleChangeValue={handleChangeValue}
              />
              <SignInInputItem
                name="email_confirm"
                placeholder={i18n.confirm}
                error={formErrors.email_confirm}
                handleChangeValue={handleChangeValue}
              />
            </div>
            <SignInInputGuide>
              <Link href={emailGuideURL} target="_blank">
                {i18n.why_we_ask_for_email}
              </Link>
            </SignInInputGuide>
            <div className={styles.inputGroup}>
              <SignInInputItem
                name="password_1"
                placeholder={i18n.password_1}
                error={formErrors.password_1}
                handleChangeValue={handleChangeValue}
                type="password"
              />
              <SignInInputItem
                name="password_1_confirm"
                placeholder={i18n.confirm}
                error={formErrors.password_1_confirm}
                handleChangeValue={handleChangeValue}
                type="password"
              />
            </div>
            <div className={styles.inputGroup}>
              <SignInInputItem
                name="password_2"
                placeholder={i18n.password_2}
                error={formErrors.password_2}
                handleChangeValue={handleChangeValue}
                type="password"
              />
              <SignInInputItem
                name="password_2_confirm"
                placeholder={i18n.confirm}
                error={formErrors.password_2_confirm}
                handleChangeValue={handleChangeValue}
                type="password"
              />
            </div>
            <SignInInputGuide>
              <Link href={emailGuideURL} target="_blank">
                {i18n.why_we_ask_for_two_passwords}
              </Link>
            </SignInInputGuide>
          </SignInModuleInputArea>
          <SignInModuleBtnRow>
            <Link href={paths.id}>
              <Button variant="transparent_blue_2" noTransition>
                {i18n.already_have_id}
              </Button>
            </Link>
            <Button
              variant="blue_2"
              className={styles.nextBtn}
              noTransition
              handleClick={handleClickNext}
              noShadow
            >
              {i18n.next}
            </Button>
          </SignInModuleBtnRow>
        </div>
      </SignInModule>
    </div>
  );
};

export default CreateID;
