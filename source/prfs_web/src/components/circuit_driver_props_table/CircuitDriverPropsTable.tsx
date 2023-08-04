"use client";

import React from "react";
import Link from "next/link";

import styles from "./CircuitDriverPropsTable.module.scss";
import Table, { TableBody, TableRow, TableHeader, TableData } from "@/components/table/Table";
import { i18nContext } from "@/contexts/i18n";
import * as prfsBackend from "@/fetch/prfsBackend";
import { PrfsCircuit, PrfsCircuitDriver } from "@/models";

const CircuitDriverPropsTable: React.FC<CircuitDriverPropsTableProps> = ({
  driver,
  handleSelectVal,
}) => {
  const i18n = React.useContext(i18nContext);
  const [data, setData] = React.useState<TableData<Record<string, any>>>({ page: 0, values: [] });

  React.useEffect(() => {
    if (driver) {
      setData({
        page: 0,
        values: Object.entries(driver.properties),
      });
    }
  }, [driver]);

  const headerElem = React.useMemo(() => {
    let { values } = data;
    if (values === undefined || values.length < 1) {
      return null;
    }

    console.log(11, values);

    return (
      <TableHeader>
        <TableRow>
          {handleSelectVal && <th className={styles.radio}></th>}
          <th className={styles.label}>{i18n.label}</th>
          <th className={styles.desc}>{i18n.description}</th>
        </TableRow>
      </TableHeader>
    );
  }, [data, handleSelectVal]);

  const rowsElem = React.useMemo(() => {
    let { page, values } = data;

    let rows = [];
    if (values === undefined || values.length < 1) {
      return rows;
    }

    for (let val of values) {
      let row = (
        <TableRow key={val.circuit_id}>
          <td key={val[0]}>{val[0]}</td>
          <td key={val[1]}>{val[1]}</td>
        </TableRow>
      );

      rows.push(row);
    }

    return rows;
  }, [driver]);

  return (
    <Table minWidth={880}>
      {headerElem}
      <TableBody>{rowsElem}</TableBody>
    </Table>
  );
};

export default CircuitDriverPropsTable;

export interface CircuitDriverPropsTableProps {
  driver: PrfsCircuitDriver;
  selectType?: "checkbox" | "radio";
  selectedVal?: PrfsCircuit;
  handleSelectVal?: (row: PrfsCircuit) => void;
}
