"use client";

import React from "react";
import Link from "next/link";

import styles from "./CircuitDriverTable.module.scss";
import Table, { TableBody, TableRow, TableHeader, TableData } from "@/components/table/Table";
import { i18nContext } from "@/contexts/i18n";
import * as prfsBackend from "@/fetch/prfsBackend";
import { PrfsCircuitDriver } from "@/models";

const CircuitDriverTable: React.FC<CircuitDriverTableProps> = ({
  selectType,
  selectedVal,
  handleSelectVal,
}) => {
  const i18n = React.useContext(i18nContext);
  const [data, setData] = React.useState<TableData<PrfsCircuitDriver>>({ page: 0, values: [] });

  const handleChangeProofPage = React.useCallback(async (page: number) => {
    return prfsBackend
      .getPrfsNativeCircuitDrivers({
        page,
      })
      .then(resp => {
        const { page, prfs_circuit_drivers } = resp.payload;
        return {
          page,
          values: prfs_circuit_drivers,
        };
      });
  }, []);

  React.useEffect(() => {
    Promise.resolve(handleChangeProofPage(0)).then(res => {
      setData(res);
    });
  }, [setData, handleChangeProofPage]);

  const rowsElem = React.useMemo(() => {
    let { page, values } = data;

    let rows = [];
    if (values === undefined || values.length < 1) {
      return rows;
    }

    for (let val of values) {
      const onClickRow = handleSelectVal
        ? (_ev: React.MouseEvent) => {
            handleSelectVal(val);
          }
        : undefined;

      const isSelected = selectedVal && !!selectedVal[val.driver_id];
      const selType = selectType || "radio";

      let row = (
        <TableRow key={val.driver_id} onClickRow={onClickRow} isSelected={isSelected}>
          {selectedVal && (
            <td className={styles.radio}>
              <input type={selType} checked={isSelected} readOnly />
            </td>
          )}
          <td className={styles.driver_id}>
            <Link href={`/drivers/${val.driver_id}`}>{val.driver_id}</Link>
          </td>
          <td className={styles.repoUrl}>{val.driver_repository_url}</td>
          <td className={styles.version}>{val.version}</td>
        </TableRow>
      );

      rows.push(row);
    }

    return rows;
  }, [data]);

  return (
    <Table minWidth={880}>
      <TableHeader>
        <TableRow>
          {handleSelectVal && <th className={styles.radio}></th>}
          <th className={styles.driver_id}>{i18n.driver_id}</th>
          <th className={styles.driver_repository_url}>{i18n.driver_repository_url}</th>
          <th className={styles.version}>{i18n.version}</th>
        </TableRow>
      </TableHeader>
      <TableBody>{rowsElem}</TableBody>
    </Table>
  );
};

export default CircuitDriverTable;

export interface CircuitDriverTableProps {
  selectType?: "checkbox" | "radio";
  selectedVal?: PrfsCircuitDriver;
  handleSelectVal?: (row: PrfsCircuitDriver) => void;
}
