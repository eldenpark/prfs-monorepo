import React, { Suspense } from "react";

import styles from "./page.module.scss";
import DefaultLayout, { DefaultFooter } from "@/components/layouts/default_layout/DefaultLayout";
import GlobalFooter from "@/components/global_footer/GlobalFooter";
import Attestations from "@/components/attestations/Attestations";
import TwitterAccAtstList from "@/components/twitter_acc_atst_list/TwitterAccAtstList";
import {
  AttestationsDefaultBody,
  AttestationsMain,
  AttestationsMainInner,
} from "@/components/attestations/AttestationComponents";

const TwitterAttestionPage = () => {
  return (
    <DefaultLayout>
      <AttestationsDefaultBody>
        <Suspense>
          <Attestations>
            <AttestationsMain>
              <AttestationsMainInner>
                <TwitterAccAtstList />
              </AttestationsMainInner>
            </AttestationsMain>
          </Attestations>
        </Suspense>
      </AttestationsDefaultBody>
      {/* <DefaultFooter> */}
      {/*   <GlobalFooter /> */}
      {/* </DefaultFooter> */}
    </DefaultLayout>
  );
};

export default TwitterAttestionPage;
