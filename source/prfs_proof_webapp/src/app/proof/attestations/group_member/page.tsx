import React, { Suspense } from "react";

import styles from "./page.module.scss";
import DefaultLayout, { DefaultFooter } from "@/components/layouts/default_layout/DefaultLayout";
import GlobalFooter from "@/components/global_footer/GlobalFooter";
import Attestations from "@/components/attestations/Attestations";
import {
  AttestationsDefaultBody,
  AttestationsMain,
  AttestationsMainInner,
} from "@/components/attestations/AttestationComponents";
import CryptoAssetAtstList from "@/components/crypto_asset_atst_list/CryptoAssetAtstList";
import GlobalErrorDialog from "@/components/global_error_dialog/GlobalErrorDialog";

const CryptoSizePage = () => {
  return (
    <DefaultLayout>
      <AttestationsDefaultBody>
        <Suspense>
          <Attestations>
            <AttestationsMain>
              <AttestationsMainInner>
                123
                {/* <CryptoAssetAtstList /> */}
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

export default CryptoSizePage;
