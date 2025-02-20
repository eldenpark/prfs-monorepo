"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { prfsApi2 } from "@taigalabs/prfs-api-js";
import { PrfsSet } from "@taigalabs/prfs-entities/bindings/PrfsSet";
import ArrowButton from "@taigalabs/prfs-react-components/src/arrow_button/ArrowButton";

import styles from "./Set.module.scss";
// import { stateContext } from "@/contexts/state";
import { WidgetLabel } from "@/components/widget/Widget";
import { i18nContext } from "@/contexts/i18n";
import DefaultLayout from "@/layouts/default_layout/DefaultLayout";
import useLocalWallet from "@/hooks/useLocalWallet";
import SetElementTable from "@/components/set_element_table/SetElementTable";
import SetDetailTable from "@/components/set_detail_table/SetDetailTable";
import { paths } from "@/paths";
import { ContentAreaHeader, ContentAreaRow } from "@/components/content_area/ContentArea";
import { useAppDispatch } from "@/state/hooks";

const Set: React.FC<SetProps> = ({ params }) => {
  const i18n = React.useContext(i18nContext);
  // const { dispatch } = React.useContext(stateContext);

  const dispatch = useAppDispatch();
  useLocalWallet(dispatch);
  // const router = useRouter();

  const [prfsSet, setPrfsSet] = React.useState<PrfsSet>();
  React.useEffect(() => {
    async function fn() {
      try {
        const { payload } = await prfsApi2("get_prfs_set_by_set_id", {
          set_id: params.set_id,
        });

        setPrfsSet(payload.prfs_set);
      } catch (err) {
        console.error(err);
      }
    }

    fn().then();
  }, [setPrfsSet]);

  let setTableLabel = `${i18n.set} summary for ${params.set_id}`;

  return (
    <DefaultLayout>
      <ContentAreaHeader>
        <Link href={paths.sets}>
          <ArrowButton variant="left" />
        </Link>
        <WidgetLabel>{setTableLabel}</WidgetLabel>
      </ContentAreaHeader>

      <div className={styles.contentBody}>
        <ContentAreaRow>
          <div className={styles.singleColRow}>
            <div className={styles.tableContainer}>
              <SetDetailTable prfsSet={prfsSet} />
            </div>
          </div>
        </ContentAreaRow>

        <ContentAreaRow>
          <div className={styles.singleColRow}>
            <div className={styles.tableTitle}>{i18n.elements}</div>
            <SetElementTable setId={params.set_id} prfsSet={prfsSet} />
          </div>
        </ContentAreaRow>
      </div>
    </DefaultLayout>
  );
};

export default Set;

interface SetProps {
  params: {
    set_id: string;
  };
}
