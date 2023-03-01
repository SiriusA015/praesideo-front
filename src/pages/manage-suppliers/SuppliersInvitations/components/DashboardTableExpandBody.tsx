import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  Collapse,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

import Status from "../../../../components/Status";
import { Icon } from "../../../../components/Icon/Icon";
import DropdownService from "../../../../services/DropdownService";
import { CurrencyOptions } from "../../../../models/Api.model";
import { DATE_FORMAT, MULTIPLE, STATUS } from "../../../../constants";
import { useInvitations } from "../hooks/useInvitations";
import { INVITATIONS_TABS } from "../constants";
import { SupplierData } from "../models";
import styles from "../styles.module.scss";
import { DashboardExpandSection } from "./DashboardExpandSection";

type BodyProps = {
  rows: SupplierData[];
  pageSize: number;
  isDemoable?: boolean;
  onUpdate: () => void;
};

export const DashboardTableExpandBody = ({
  rows,
  pageSize,
  isDemoable,
  onUpdate,
}: BodyProps) => {
  console.log('this is isDemoable', isDemoable);
  const { handleInvitationChange } = useInvitations();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [currencies, setCurrencies] = useState<CurrencyOptions[]>();

  useEffect(() => {
    DropdownService.getBaseCurrency().then((list) => {
      setCurrencies(list);
    });
  }, []);

  const handleChange = (panel: string) => {
    setExpanded((expanded) => (expanded !== panel ? panel : false));
  };

  const handleClick = (id: number) => {
    if (handleInvitationChange) {
      handleInvitationChange(INVITATIONS_TABS.SUMMARY, id);
    }
  };

  const emptyRows = rows ? pageSize - rows.length : 0;

  return (
    <TableBody>
      {rows.map(
        (
          {
            supplyChainId,
            companyName,
            supplierInvitationStatus,
            supplierInvitationDate,
            amount,
            currency,
            supplierContactEmail,
          },
          index
        ) => {
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
              >
                <TableCell
                  onClick={() => {
                    handleChange(supplyChainId.toString());
                  }}
                >
                  <IconButton className={styles.icon} size="small">
                    <Icon
                      icon={selected ? "chevron-up" : "chevron-down"}
                      color="grey"
                    />
                  </IconButton>
                </TableCell>
                <TableCell
                  onClick={() => {
                    handleChange(supplyChainId.toString());
                  }}
                >
                  {companyName}
                </TableCell>
                <TableCell
                  onClick={() => {
                    handleChange(supplyChainId.toString());
                  }}
                >
                  {amount && currency
                    ? currency !== MULTIPLE
                      ? `${amount} ${
                          currencies?.find(
                            ({ value }) => value.toString() === currency
                          )?.label
                        }`
                      : MULTIPLE
                    : "-"}
                </TableCell>
                <TableCell
                  onClick={() => {
                    handleChange(supplyChainId.toString());
                  }}
                >
                  <Status variant={supplierInvitationStatus} />
                </TableCell>
                <TableCell
                  onClick={() => {
                    handleChange(supplyChainId.toString());
                  }}
                >
                  {supplierInvitationDate &&
                    moment(supplierInvitationDate).format(DATE_FORMAT)}
                </TableCell>
                <TableCell>
                  {supplierInvitationStatus &&
                    supplierInvitationStatus !== STATUS.PENDING && (
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        className={styles.submitButton}
                        disabled={isDemoable}
                        onClick={() => {
                          handleClick(supplyChainId);
                        }}
                      >
                        Invite now
                      </Button>
                    )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6} padding="none">
                  <Collapse in={selected} timeout="auto" unmountOnExit>
                    <DashboardExpandSection
                      isDemoable={isDemoable}
                      supplyChainId={supplyChainId}
                      onUpdate={onUpdate}
                      email={supplierContactEmail}
                    />
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
        }
      )}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};
