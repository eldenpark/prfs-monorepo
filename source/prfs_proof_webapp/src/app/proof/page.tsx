import React, { Suspense } from "react";

import styles from "./page.module.scss";
import DefaultLayout, {
  DefaultBody,
  DefaultFooter,
} from "@/components/layouts/default_layout/DefaultLayout";
import GlobalFooter from "@/components/global_footer/GlobalFooter";
import Home from "@/components/home/Home";
import HomeMasthead from "@/components/home_masthead/HomeMasthead";
import GlobalErrorDialog from "@/components/global_error_dialog/GlobalErrorDialog";

const HomePage = () => {
  return (
    <DefaultLayout>
      <GlobalErrorDialog />
      <DefaultBody noMinWidth>
        <Suspense>
          <HomeMasthead />
        </Suspense>
        <Suspense>
          <Home />
        </Suspense>
      </DefaultBody>
      {/* <DefaultFooter> */}
      {/*   <GlobalFooter /> */}
      {/* </DefaultFooter> */}
    </DefaultLayout>
  );
};

export default HomePage;
