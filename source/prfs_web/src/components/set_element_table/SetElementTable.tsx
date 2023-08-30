import React from "react";
import cn from "classnames";
// import * as prfsApi from "@taigalabs/prfs-api-js";
import { prfsApi2 } from "@taigalabs/prfs-api-js";
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { PrfsTreeNode } from "@taigalabs/prfs-entities/bindings/PrfsTreeNode";
import { PrfsSet } from "@taigalabs/prfs-entities/bindings/PrfsSet";

import styles from "./SetElementTable.module.scss";
import Table2, {
  Table2Body,
  Table2Head,
  Table2Pagination,
  TableSearch,
} from "@/components/table2/Table2";
import { EditableCell } from "./TableCell";
import { i18nContext } from "@/contexts/i18n";

const columnHelper = createColumnHelper<PrfsTreeNode>();

const SetElementTable: React.FC<SetElementTableProps> = ({ setId, prfsSet, editable }) => {
  const i18n = React.useContext(i18nContext);
  const [data, setData] = React.useState<PrfsTreeNode[]>(() => []);

  const columns = React.useMemo<ColumnDef<PrfsTreeNode, any>[]>(
    () => [
      columnHelper.accessor("pos_w", {
        header: "Position",
        meta: {
          type: "text",
        },
      }),
      columnHelper.accessor("val", {
        header: "Value",
        cell: editable ? EditableCell : ctx => ctx.getValue(),
        meta: {
          type: "text",
        },
      }),
      columnHelper.accessor("meta", {
        header: "Meta",
        cell: editable ? EditableCell : ctx => ctx.getValue(),
        meta: {
          type: "text",
        },
      }),
    ],
    []
  );

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  React.useEffect(() => {
    async function fn() {
      // const { payload } = await prfsApi.getPrfsTreeLeafNodesBySetId({
      //   page_idx: pageIndex,
      //   page_size: pageSize,
      //   set_id: setId,
      // });
      const { payload } = await prfsApi2("get_prfs_tree_leaf_nodes_by_set_id", {
        page_idx: pageIndex,
        page_size: pageSize,
        set_id: setId,
      });

      const { prfs_tree_nodes } = payload;

      setData(prfs_tree_nodes);
    }

    fn().then();
  }, [setId, setData, pageIndex, pageSize]);

  const pagination = React.useMemo(() => {
    return {
      pageIndex,
      pageSize,
    };
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    pageCount: prfsSet ? Math.ceil(Number(prfsSet.cardinality) / pageSize) : -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    meta: {
      cardinality: prfsSet ? Number(prfsSet.cardinality) : -1,
      updateData: async function <Key extends keyof PrfsTreeNode>(
        rowIndex: number,
        columnId: Key,
        value: unknown
      ) {
        console.log(11, rowIndex, columnId, value);

        const node = data[rowIndex];
        console.log(22, node);
        if (node) {
          node[columnId] = value as any;
        }
        console.log(33, node);

        try {
          // const { payload } = await prfsApi.updatePrfsTreeNodeRequest({ prfs_tree_node: node });
          await prfsApi2("update_prfs_tree_node", { prfs_tree_node: node });

          setData(old =>
            old.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex],
                  [columnId]: value,
                };
              }
              return row;
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    },
  });

  return (
    prfsSet && (
      <div className={styles.wrapper}>
        <div className={styles.tableContainer}>
          <TableSearch>
            <input placeholder={i18n.set_search_guide} />
          </TableSearch>

          <Table2>
            <Table2Head>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </Table2Head>

            <Table2Body>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td
                      className={cn({
                        [styles.pos_w]: cell.column.id === "pos_w",
                        [styles.value]: cell.column.id === "value",
                      })}
                      key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </Table2Body>
          </Table2>
        </div>
        <Table2Pagination table={table} />
      </div>
    )
  );
};

export default SetElementTable;

export interface SetElementTableProps {
  setId: string;
  prfsSet: PrfsSet | undefined;
  editable?: boolean;
}
