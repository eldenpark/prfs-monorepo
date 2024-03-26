import React, { Suspense } from "react";

import { DefaultLayout, DefaultBody } from "@/components/layouts/default_layout/DefaultLayout";
import ProofGen from "@/components/proof_gen/ProofGen";
import GlobalErrorHeader from "@/components/global_error_header/GlobalErrorHeader";
import GlobalMsgHeader from "@/components/global_msg_header/GlobalMsgHeader";

const ProofGenPage = () => {
  return (
    <DefaultLayout>
      <DefaultBody>
        <Suspense>
          <ProofGen />
          <GlobalErrorHeader />
          <GlobalMsgHeader />
        </Suspense>
      </DefaultBody>
    </DefaultLayout>
  );
};

export default ProofGenPage;
