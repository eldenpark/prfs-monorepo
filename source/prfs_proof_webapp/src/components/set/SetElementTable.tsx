import React from "react";
import cn from "classnames";
import { useInfiniteQuery } from "@taigalabs/prfs-react-lib/react_query";
import { useVirtualizer } from "@taigalabs/prfs-react-lib/react_virtual";
import { prfsApi3, treeApi } from "@taigalabs/prfs-api-js";
import { i18nContext } from "@/i18n/context";
import { PrfsSetElement } from "@taigalabs/prfs-entities/bindings/PrfsSetElement";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import styles from "./SetElementTable.module.scss";
import {
  AppTableBody,
  AppTableHeader,
  AppTableHeaderCell,
  AppTableRow,
  AppTableBodyInner,
  AppTableCell,
  AppTableWrapper,
} from "@/components/app_table_components/AppTableComponents";
import { paths } from "@/paths";

const Row: React.FC<RowProps> = ({ row, style, router }) => {
  const name = React.useMemo(() => {
    if (row.label.length > 12) {
      return row.label.substring(0, 12) + "...";
    } else {
      row.label;
    }
  }, [row.label]);

  const data = React.useMemo(() => {
    return JSON.stringify(row.data);
  }, [row.data]);

  const handleClick = React.useCallback(() => {
    router.push(`${paths.sets}/${row.set_id}/${row.label}`);
  }, [router, row]);

  return (
    <AppTableRow style={style} handleClick={handleClick}>
      <AppTableCell className={cn(styles.name)}>
        <span>{name}</span>
      </AppTableCell>
      <AppTableCell className={cn(styles.data, styles.w1024)}>{data}</AppTableCell>
      <AppTableCell className={cn(styles.ref, styles.w1320)}>{row.ref}</AppTableCell>
    </AppTableRow>
  );
};

function fetchPrfsSetElements(set_id: string, nonce: number) {
  return useInfiniteQuery({
    queryKey: ["get_prfs_set_elements", nonce],
    queryFn: async ({ pageParam }) => {
      return treeApi({ type: "get_prfs_set_elements", offset: pageParam as number, set_id });
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.payload) {
        return lastPage.payload.next_offset;
      } else {
        return null;
      }
    },
  });
}

const SetElementTable: React.FC<SetElementTableProps> = ({ setId, nonce }) => {
  const i18n = React.useContext(i18nContext);
  const router = useRouter();
  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
    fetchPrfsSetElements(setId, nonce);

  const allRows = data
    ? data.pages.flatMap(d => {
        return d.payload ? d.payload.rows : [];
      })
    : [];
  const parentRef = React.useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 5,
  });

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <AppTableWrapper>
      {status === "pending" ? (
        <p className={styles.loading}>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {(error as Error).message}</span>
      ) : (
        <>
          <AppTableHeader
            className={cn({
              [styles.noData]: rowVirtualizer.getVirtualItems().length === 0,
            })}
          >
            <AppTableHeaderCell className={cn(styles.name)}>{i18n.name}</AppTableHeaderCell>
            <AppTableHeaderCell className={cn(styles.data, styles.w1024)}>
              {i18n.data}
            </AppTableHeaderCell>
            <AppTableHeaderCell className={cn(styles.ref, styles.w1320)}>
              {i18n.ref}
            </AppTableHeaderCell>
          </AppTableHeader>
          <AppTableBody innerRef={parentRef}>
            <AppTableBodyInner
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
              }}
            >
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const isLoaderRow = virtualRow.index > allRows.length - 1;
                const row = allRows[virtualRow.index];

                if (isLoaderRow) {
                  return hasNextPage ? <div key={virtualRow.key}>Loading more...</div> : null;
                }

                return (
                  <Row
                    key={virtualRow.index}
                    row={row}
                    router={router}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  />
                );
              })}
            </AppTableBodyInner>
          </AppTableBody>
        </>
      )}
    </AppTableWrapper>
  );
};

export default SetElementTable;

export interface SetElementTableProps {
  setId: string;
  nonce: number;
}

export interface RowProps {
  row: PrfsSetElement;
  style: React.CSSProperties;
  router: AppRouterInstance;
}
