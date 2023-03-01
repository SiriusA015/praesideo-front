import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
} from "@material-ui/core";

import Status from "../../../../components/Status";
import SupplyChainService from "../../../../services/SupplyChainService";
import DropdownService from "../../../../services/DropdownService";
import { useAuth } from "../../../../helpers/useAuth";
import { camelToSnakeCase } from "../../../../helpers/camelToSnakeCase";
import { useAlert } from "../../../../helpers/hooks/useAlert";
import { INITIAL_TABLE_STATE, SUPPLIERS_SECTIONS } from "../../constants";
import { MULTIPLE, Order } from "../../../../constants";
import {
  SupplierData,
  TableState,
  SuppliersYears,
  SupplierTypeCategories,
  CurrenciesType,
} from "../../models";
import styles from "../styles.module.scss";
import { SetTabContext } from "../..";
import { SuppliersTableHead } from "./SuppliersTableHead";

type SuppliersTableProps = {
  years: {
    selected: number;
    list?: SuppliersYears[];
  };
  isDemoable?: boolean;
};

export const SuppliersTable = ({ years, isDemoable }: SuppliersTableProps) => {
  const {
    user: { companyId },
  } = useAuth();
  const tabContext = useContext(SetTabContext);
  const [, setAlert] = useAlert();
  const [rows, setRows] = useState<SupplierData[]>();
  const [currencies, setCurrencies] = useState<CurrenciesType[]>();
  const [categories, setCategories] = useState<SupplierTypeCategories[]>();
  const [types, setTypes] = useState<SupplierTypeCategories[]>();
  const [selected, setSelected] = useState<number[]>([]);
  const [totalSize, setTotalSize] = useState(0);
  const isMountedRef = useRef(true);
  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    []
  );
  const [tableState, setTableState] = useReducer(
    (state: TableState, newState: Partial<TableState>): TableState => ({
      ...state,
      ...newState,
    }),
    INITIAL_TABLE_STATE
  );
  const { pageNumber, pageSize, orderBy, order } = tableState;

  const fetchSuppliers = () => {
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
  };

  useEffect(() => {
    DropdownService.getBaseCurrency().then((list) => {
      setCurrencies(
        list.map(({ value, label, ...rest }) => ({
          ...rest,
          value: label,
          id: value,
        }))
      );
    });
    SupplyChainService.getSuppliersCategories().then(({ data }) => {
      setCategories(data);
    });
    SupplyChainService.getSuppliersTypes().then(({ data }) => {
      setTypes(data);
    });
  }, []);

  useEffect(() => {
    const { selected, list } = years;
    if (selected && list && rows) {
      setTableState({});
      setSelected([]);
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && rows) {
      const newSelecteds = rows.map((n) => n.supplyChainId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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

  const handleDelete = async () => {
    const { error } = await SupplyChainService.deleteSupplierChain(selected);
    if (!error) {
      setAlert({ text: "Successfully deleted chains", duration: 5000 });
    } else {
      setAlert({ text: error, severity: "error" });
    }
    setSelected([]);
    fetchSuppliers();
  };

  const goToAllocations = () => {
    tabContext?.setTabContext({
      tab: SUPPLIERS_SECTIONS.SUPPLIER_ALLOCATIONS,
      config: {
        table: tableState,
        year: years.selected,
      },
    });
  };

  const getAverageValue = (
    id: number | string | null,
    list?: Array<CurrenciesType | SupplierTypeCategories>
  ) => {
    if (id) {
      if (id === MULTIPLE) {
        return MULTIPLE;
      } else {
        return list?.find(({ id: listItemId }) => listItemId.toString() === id)
          ?.value;
      }
    }
    return "-";
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows = rows ? pageSize - rows.length : 0;

  return (
    <div className={styles.table}>
      {rows && (
        <>
          <TableContainer>
            <Table aria-labelledby="tableTitle" aria-label="suppliers table">
              <SuppliersTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                isDemoable={isDemoable}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                handleDelete={handleDelete}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row.supplyChainId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.supplyChainId}_${index}`}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          disabled={isDemoable}
                          onClick={(event) =>
                            handleClick(event, row.supplyChainId)
                          }
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell>{row.supplierId}</TableCell>
                      {row?.supplierAllocations ? (
                        <>
                          <TableCell
                            className={styles.pointer}
                            onClick={goToAllocations}
                          >
                            {getAverageValue(
                              row.supplierAllocations?.averageCategoryId,
                              categories
                            )}
                          </TableCell>
                          <TableCell
                            className={styles.pointer}
                            onClick={goToAllocations}
                          >
                            {getAverageValue(
                              row.supplierAllocations?.averageTypeId,
                              types
                            )}
                          </TableCell>
                          <TableCell
                            className={styles.pointer}
                            onClick={goToAllocations}
                          >
                            {row.supplierAllocations.sumAmount &&
                            row.supplierAllocations?.averageCurrencyId
                              ? `${
                                  row.supplierAllocations?.averageCurrencyId !==
                                  MULTIPLE
                                    ? row.supplierAllocations.sumAmount
                                    : ""
                                } ${getAverageValue(
                                  row.supplierAllocations?.averageCurrencyId,
                                  currencies
                                )}`
                              : "-"}
                          </TableCell>
                        </>
                      ) : (
                        new Array(3).fill("-").map((el, index) => (
                          <TableCell
                            key={index}
                            className={styles.pointer}
                            onClick={goToAllocations}
                          >
                            {el}
                          </TableCell>
                        ))
                      )}
                      <TableCell>
                        <Status variant={row?.status} />
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
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
