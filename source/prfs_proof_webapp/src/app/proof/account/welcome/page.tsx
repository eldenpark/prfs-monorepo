import React, { Suspense } from "react";

import styles from "./page.module.scss";
import DefaultLayout, {
  DefaultBody,
  DefaultFooter,
} from "@/components/layouts/default_layout/DefaultLayout";
import GlobalFooter from "@/components/global_footer/GlobalFooter";
import HomeMasthead from "@/components/home_masthead/HomeMasthead";
import GlobalErrorDialog from "@/components/global_error_dialog/GlobalErrorDialog";
import Welcome from "@/components/welcome/Welcome";

const AccountWelcomePage = () => {
  return (
    <DefaultLayout>
      <GlobalErrorDialog />
      <DefaultBody noMinWidth>
        <Suspense>
          <HomeMasthead />
          <Welcome />
        </Suspense>
      </DefaultBody>
      <DefaultFooter>
        <GlobalFooter />
      </DefaultFooter>
    </DefaultLayout>
  );
};

export default AccountWelcomePage;
