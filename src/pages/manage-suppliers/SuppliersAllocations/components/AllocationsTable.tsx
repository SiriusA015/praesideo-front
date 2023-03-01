import React, { useEffect, useReducer, useRef, useState } from "react";
import { Table, TableContainer, TablePagination } from "@material-ui/core";

import SupplyChainService from "../../../../services/SupplyChainService";
import { useAuth } from "../../../../helpers/useAuth";
import { camelToSnakeCase } from "../../../../helpers/camelToSnakeCase";
import { Order } from "../../../../constants";
import { INITIAL_TABLE_STATE } from "../../constants";
import { SupplierData, TableState, SuppliersYears } from "../../models";
import styles from "../styles.module.scss";
import { AllocationsTableHead } from "./AllocationsTableHead";
import { ExpandAllocationsTableBody } from "./ExpandAllocationsTableBody";

type AllocationsTableProps = {
  isDemoable?:boolean;
  years: {
    selected: number;
    list?: SuppliersYears[];
  };
  defaultTableState?: TableState;
};

export const AllocationsTable = ({
  isDemoable,
  years,
  defaultTableState = INITIAL_TABLE_STATE,
}: AllocationsTableProps) => {
  const {
    user: { companyId },
  } = useAuth();
  const isMountedRef = useRef(true);
  useEffect(() => () => { isMountedRef.current = false }, []);
  const [rows, setRows] = useState<SupplierData[]>();
  const [totalSize, setTotalSize] = useState(0);
  const [tableState, setTableState] = useReducer(
    (state: TableState, newState: Partial<TableState>): TableState => ({
      ...state,
      ...newState,
    }),
    defaultTableState
  );
  const { pageNumber, pageSize, orderBy, order } = tableState;

  const fetchSuppliers = () => {
    if (years?.selected) {
      SupplyChainService.getSuppliersChain({
        companyId,
        yearRepresentationId: years.selected,
        page: pageNumber,
        size: pageSize,
        sort: `${camelToSnakeCase(orderBy)},${order}`,
      }).then(({ content, totalElements }) => {
        if (isMountedRef.current) {
          setRows(content);
          setTotalSize(totalElements);
        }
      });
    }
  };

  useEffect(() => {
    if (years && rows) {
      setTableState({});
    }
  }, [years]);

  useEffect(fetchSuppliers, [tableState]);

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
              <AllocationsTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <ExpandAllocationsTableBody
                isDemoable={isDemoable}
                years={years}
                rows={rows}
                setRows={setRows}
                pageSize={pageSize}
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
