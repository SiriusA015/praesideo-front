import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Collapse,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

import Status from "../../../../components/Status";
import { Icon } from "../../../../components/Icon/Icon";
import DropdownService from "../../../../services/DropdownService";
import SupplyChainService from "../../../../services/SupplyChainService";
import {
  CurrenciesType,
  SupplierAllocations,
  SupplierData,
  SuppliersYears,
  SupplierTypeCategories,
} from "../../models";
import { MULTIPLE } from "../../../../constants";
import styles from "../styles.module.scss";
import { ExpandAllocationsSection } from "./ExpandAllocationsSection";

type ExpandAllocationsTableBodyProps = {
  years?: {
    selected?: number;
    list?: SuppliersYears[];
  };
  isDemoable?:boolean;
  rows: SupplierData[];
  setRows: Dispatch<SetStateAction<SupplierData[] | undefined>>;
  pageSize: number;
};

export const ExpandAllocationsTableBody = ({
  years,
  rows,
  isDemoable,
  setRows,
  pageSize,
}: ExpandAllocationsTableBodyProps) => {
  const [currencies, setCurrencies] = useState<CurrenciesType[]>();
  const [categories, setCategories] = useState<SupplierTypeCategories[]>();
  const [types, setTypes] = useState<SupplierTypeCategories[]>();
  const [expanded, setExpanded] = React.useState<string | false>(false);

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
    setExpanded(false);
  }, [years]);

  const handleChange = (panel: string) => {
    setExpanded((expanded) => (expanded !== panel ? panel : false));
  };

  const handleUpdateAllocation =
    (index: number) => (supplierAllocations: SupplierAllocations) => {
      const currentRow = rows[index];
      rows.splice(index, 1, {
        ...currentRow,
        supplierAllocations,
      });
      setRows([...rows]);
    };

  const emptyRows = rows ? pageSize - rows.length : 0;

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

  return (
    <TableBody>
      {rows.map(({ supplyChainId, supplierId, supplierAllocations }, index) => {
        const selected = expanded === supplyChainId.toString();

        return (
          <React.Fragment key={`${supplyChainId}_${index}`}>
            <TableRow
              hover
              selected={selected}
              classes={{
                hover: styles.pointer,
              }}
              aria-label={`${selected ? "collapse" : "expand"} row`}
              onClick={() => {
                handleChange(supplyChainId.toString());
              }}
            >
              <TableCell>
                <IconButton className={styles.icon} size="small">
                  <Icon
                    icon={selected ? "chevron-up" : "chevron-down"}
                    color="grey"
                  />
                </IconButton>
              </TableCell>
              <TableCell>{supplierId}</TableCell>
              {supplierAllocations ? (
                <>
                  <TableCell>
                    {getAverageValue(
                      supplierAllocations?.averageCategoryId,
                      categories
                    )}
                  </TableCell>
                  <TableCell>
                    {getAverageValue(supplierAllocations?.averageTypeId, types)}
                  </TableCell>
                  <TableCell>
                    {supplierAllocations.sumAmount &&
                    supplierAllocations?.averageCurrencyId
                      ? `${
                          supplierAllocations?.averageCurrencyId !== MULTIPLE
                            ? supplierAllocations.sumAmount
                            : ""
                        } ${getAverageValue(
                          supplierAllocations?.averageCurrencyId,
                          currencies
                        )}`
                      : "-"}
                  </TableCell>
                </>
              ) : (
                new Array(3)
                  .fill("-")
                  .map((el, index) => <TableCell key={index}>{el}</TableCell>)
              )}
              <TableCell>
                {supplierAllocations && (
                  <Status variant={supplierAllocations.status} />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} padding="none">
                <Collapse in={selected} timeout="auto" unmountOnExit>
                  {types && categories && currencies && (
                    <ExpandAllocationsSection
                      isDemoable={isDemoable}
                      supplierAllocations={supplierAllocations}
                      supplyChainId={supplyChainId}
                      onUpdate={handleUpdateAllocation(index)}
                      categories={categories}
                      types={types}
                      currencies={currencies}
                    />
                  )}
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};
