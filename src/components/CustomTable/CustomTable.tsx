import { CustomRowProps, CustomTableProps } from "./CustomTable.model";
import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";
import styles from "./CustomTable.module.scss";
import { Icon } from "../Icon/Icon";
import CustomForm from "../CustomForm/CustomForm";

const CustomTable = (props: CustomTableProps) => {
  const { onFormSubmit } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {props.columns?.map((column, index) => (
              <TableCell key={`column-${index}`}>{column.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <CustomRow
              key={`column-${index}`}
              row={row}
              formConfig={props.formConfig}
              columns={props.columns}
              onFormSubmit={onFormSubmit}
              isDataDemoable={props.isDataDemoable}
              isDataOpenable={props.isDataOpenable}
              isDataEditable={props.isDataEditable}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CustomRow = (props: CustomRowProps) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const onFormSubmit = (value: any) => {
    if (props.onFormSubmit) {
      props.onFormSubmit({ ...row, ...value });
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {props.isDataOpenable && <>
              {open ? (
                  <Icon icon="chevron-up" className={styles.icon} color="grey" />
                ) : (
                  <Icon icon="chevron-down" className={styles.icon} color="grey" />
                )}
            </>}
          </IconButton>
        </TableCell>
        {props.columns?.map((column, index) => (
          <TableCell key={`row-column-${index}`}>
            {column.renderAllCells ? column.renderAllCells(row) :
              column.renderCell ? column.renderCell(row[column.field])
                : row[column.field]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className={styles.tableCell} colSpan={(props.columns?.length || 0) + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CustomForm
              config={props.formConfig}
              onSubmit={onFormSubmit}
              isDataDemoable={props.isDataDemoable}
              isDataEditable={props.isDataEditable}
              data={row}
              submitOnBlur
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomTable;
