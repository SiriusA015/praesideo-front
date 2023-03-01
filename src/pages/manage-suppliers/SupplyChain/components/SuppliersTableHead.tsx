import React from "react";
import clsx from "clsx";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  IconButton,
} from "@material-ui/core";

import { Icon } from "../../../../components/Icon/Icon";
import { Order } from "../../../../constants";
import { TABLE_HEAD_CELLS } from "../constants";
import styles from "../styles.module.scss";

type TableHeadProps = {
  numSelected: number;
  handleDelete: () => void;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: string
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  isDemoable?:boolean;
  rowCount: number;
};

export const SuppliersTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  isDemoable,
  onRequestSort,
  handleDelete,
}: TableHeadProps) => {
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            disabled={isDemoable}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all suppliers" }}
          />
        </TableCell>
        {TABLE_HEAD_CELLS.map((headCell) => (
          <TableCell
            key={headCell.label}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : Order.ASC}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={styles.hidden}>
                    {order === Order.DESC
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
        <TableCell>
          <IconButton
            onClick={handleDelete}
            aria-label="delete"
            className={clsx(
              styles.icon,
              !(numSelected > 0) && styles.hiddenDelete
            )}
          >
            <Icon icon="trash" size="sm" solid />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
