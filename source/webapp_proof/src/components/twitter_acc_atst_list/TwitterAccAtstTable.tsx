import React from "react";
import cn from "classnames";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { GetTwitterAccAtstsResponse } from "@taigalabs/prfs-entities/bindings/GetTwitterAccAtstsResponse";
import { PrfsApiResponse, atstApi } from "@taigalabs/prfs-api-js";
import { i18nContext } from "@/i18n/context";

import styles from "./TwitterAccAtstTable.module.scss";
import { PrfsAccAtst } from "@taigalabs/prfs-entities/bindings/PrfsAccAtst";

const AtstRow: React.FC<AtstRowProps> = ({ atst, style }) => {
  return (
    <div className={cn(styles.row)} style={style}>
      <div className={styles.username}>{atst.username}</div>
      <div className={styles.accountId}>{atst.account_id}</div>
      <div className={styles.commitment}>{atst.cm}</div>
      <div className={styles.url}>{atst.document_url}</div>
    </div>
  );
};

// export async function fetchServerPage2(offset: number, pageSize: number) {
//   console.log("fetch", offset);

//   const rows = Array(pageSize)
//     .fill(0)
//     .map((_, i) => {
//       // return `Async loaded row #${i + pageSize * crs}`;
//       return {
//         name: "Project " + (i + offset) + ` (server time: ${Date.now()})`,
//         id: i + offset,
//       };
//     });

//   const nextId = offset + pageSize;
//   console.log("fetch nextId", nextId);
//   return { rows, nextId };
// }

const TwitterAccAtstTable: React.FC<TwitterAccAtstTableProps> = () => {
  const i18n = React.useContext(i18nContext);
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PrfsApiResponse<GetTwitterAccAtstsResponse>>({
      queryKey: ["projects"],
      queryFn: async ({ pageParam }) => {
        console.log("pageParam", pageParam);
        return atstApi("get_twitter_acc_atsts", { offset: pageParam as number });
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage: any) => lastPage.nextId ?? undefined,
    });

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
    <div className={styles.wrapper}>
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {(error as Error).message}</span>
      ) : (
        <>
          <div
            className={cn(styles.header, {
              [styles.noData]: rowVirtualizer.getVirtualItems().length === 0,
            })}
          >
            <div className={styles.username}>{i18n.username}</div>
            <div className={styles.accountId}>{i18n.account_id}</div>
            <div className={styles.commitment}>{i18n.commitment}</div>
            <div className={styles.url}>{i18n.document_url}</div>
          </div>
          <div className={styles.listContainer} ref={parentRef}>
            <div
              className={styles.listInner}
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
              }}
            >
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const isLoaderRow = virtualRow.index > allRows.length - 1;
                const row = allRows[virtualRow.index];

                return isLoaderRow ? (
                  hasNextPage ? (
                    "Loading more..."
                  ) : (
                    "Nothing more to load"
                  )
                ) : (
                  <AtstRow
                    atst={row}
                    key={virtualRow.index}
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
            </div>
          </div>
        </>
      )}
      <div>{isFetching && !isFetchingNextPage ? "Background Updating..." : null}</div>
    </div>
  );
};

export default TwitterAccAtstTable;

export interface TwitterAccAtstTableProps {}

export interface AtstRowProps {
  atst: PrfsAccAtst;
  style: React.CSSProperties;
}
