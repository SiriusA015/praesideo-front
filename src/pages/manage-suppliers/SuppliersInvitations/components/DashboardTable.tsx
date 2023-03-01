import React, { Dispatch } from "react";
import { Table, TableContainer, TablePagination } from "@material-ui/core";

import { Order } from "../../../../constants";
import { TableState } from "../../models";
import { SupplierData } from "../models";
import styles from "../styles.module.scss";
import { DashboardTableHead } from "./DashboardTableHead";
import { DashboardTableExpandBody } from "./DashboardTableExpandBody";

type DashboardTableProps = {
  rows?: SupplierData[];
  fetchSuppliers: (body: TableState) => void;
  totalSize: number;
  isDemoable?: boolean;
  tableState: TableState;
  setTableState: Dispatch<Partial<TableState>>;
};

export const DashboardTable = ({
  rows,
  fetchSuppliers,
  totalSize,
  tableState,
  isDemoable,
  setTableState
}: DashboardTableProps) => {
  const { pageNumber, pageSize, orderBy, order } = tableState;

  const handleEmailUpdate = () => {
    fetchSuppliers(tableState);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === Order.ASC;
    setTableState({ order: isAsc ? Order.DESC : Order.ASC, orderBy: property });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setTableState({ pageNumber: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTableState({
      pageNumber: 0,
      pageSize: parseInt(event.target.value, 10),
    });
  };

  return (
    <div className={styles.table}>
      {rows && (
        <>
          <TableContainer>
            <Table aria-labelledby="tableTitle" aria-label="suppliers table">
              <DashboardTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <DashboardTableExpandBody
                rows={rows}
                pageSize={pageSize}
                isDemoable={isDemoable}
                onUpdate={handleEmailUpdate}
              />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalSize}
            rowsPerPage={pageSize}
            page={pageNumber}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </div>
  );
};
