import { useContext, useEffect, useReducer, useState } from "react";
import { Box, Button, Grid, Link, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

import { useAuth } from "../../../helpers/useAuth";
import { useAlert } from "../../../helpers/hooks/useAlert";
import { camelToSnakeCase } from "../../../helpers/camelToSnakeCase";
import SupplyChainService from "../../../services/SupplyChainService";
import { SetTabContext } from "..";
import { INITIAL_TABLE_STATE, SUPPLIERS_SECTIONS } from "../constants";
import { TabComponentProps, TableState } from "../models";
import { InvitationsProvider } from "./hooks/useInvitations";
import { DashboardTable, Summary } from "./components";
import { INVITATIONS_TABS } from "./constants";
import { SupplierData, SupplierInvitationInfo } from "./models";
import styles from "./styles.module.scss";

const SuppliersInvitations = ({ config,  isDemoable }: TabComponentProps) => {
  const tabContext = useContext(SetTabContext);
  const {
    user: { companyId },
  } = useAuth();
  const [, setAlert] = useAlert();
  const [rows, setRows] = useState<SupplierData[]>();
  const [totalSize, setTotalSize] = useState(0);
  const [invitation, setInvitation] = useState(INVITATIONS_TABS.DASHBOARD);
  const [selectedSupplyChainId, setSupplyId] = useState(0);
  const [supplierInvitationInfo, setSupplierInvitationInfo] =
    useState<SupplierInvitationInfo>();
  const [tableState, setTableState] = useReducer(
    (state: TableState, newState: Partial<TableState>): TableState => ({
      ...state,
      ...newState,
    }),
    config?.table || INITIAL_TABLE_STATE
  );

  const fetchSuppliers = ({
    order,
    orderBy,
    pageNumber,
    pageSize,
  }: TableState) => {
    SupplyChainService.getSuppliersInvitations({
      companyId,
      page: pageNumber,
      size: pageSize,
      sort: `${camelToSnakeCase(orderBy)},${order}`,
    }).then(({ content, totalElements }) => {
      setRows(content);
      setTotalSize(totalElements);
    });
  };

  useEffect(() => {
    fetchSuppliers(tableState);
  }, [tableState]);

  useEffect(() => {
    if (selectedSupplyChainId) {
      SupplyChainService.getSupplierInvitationInfo(selectedSupplyChainId).then(
        ({ data }) => {
          setSupplierInvitationInfo(data);
        }
      );
    }
  }, [selectedSupplyChainId]);

  const goToSupplyChain = () => {
    tabContext?.setTabContext({
      tab: SUPPLIERS_SECTIONS.SUPPLY_CHAIN,
      config: {},
    });
  };

  const handleInvitationChange = (newTab: INVITATIONS_TABS, id = 0) => {
    setInvitation(newTab);
    setSupplyId(id);
    setSupplierInvitationInfo(undefined);
  };

  const handleSendInvitation = async () => {
    if (invitation === INVITATIONS_TABS.DASHBOARD) {
      setInvitation(INVITATIONS_TABS.SUMMARY);
    } else {
      if (supplierInvitationInfo) {
        const { error } = await SupplyChainService.sendInvitationMessage(
          supplierInvitationInfo
        );
        if (!error) {
          setAlert({
            text: "Successfully sent",
            severity: "success",
            duration: 5000,
          });
          setInvitation(INVITATIONS_TABS.DASHBOARD);
        } else {
          setAlert({ text: error, severity: "error" });
        }
      }
    }
  };

  return (
    <div>
      {rows && !rows?.length && (
        <h3>
          Please add first suppliers in your supply chain
          <Link
            className={styles.link}
            underline="always"
            color="secondary"
            onClick={goToSupplyChain}
          >
            here
          </Link>
        </h3>
      )}
      {Boolean(rows?.length) && (
        <div>
          <TabContext value={invitation}>
            <Grid container>
              <Grid container item xs={7} alignItems="center">
                <TabList
                  aria-label="invitations-tab"
                  variant="scrollable"
                  onChange={(
                    e: React.ChangeEvent<{}>,
                    newTab: INVITATIONS_TABS
                  ) => {
                    if (newTab !== invitation) {
                      handleInvitationChange(newTab);
                    }
                  }}
                >
                  <Tab
                    label={INVITATIONS_TABS.DASHBOARD}
                    value={INVITATIONS_TABS.DASHBOARD}
                    className={styles.tab}
                  />
                  <Tab
                    label={INVITATIONS_TABS.SUMMARY}
                    value={INVITATIONS_TABS.SUMMARY}
                    className={styles.tab}
                  />
                </TabList>
              </Grid>
              <Grid item xs={5}>
                <Box
                  display="flex"
                  height="100%"
                  justifyContent="end"
                  alignItems="center"
                >
                  {invitation === INVITATIONS_TABS.SUMMARY && (
                    <Button
                      disabled={!Boolean(selectedSupplyChainId) || isDemoable}
                      form="send-invitation-form"
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={handleSendInvitation}
                    >
                      Send invitations for subscription
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>

            <TabPanel
              value={INVITATIONS_TABS.DASHBOARD}
              className={styles.tabPanel}
            >
              <InvitationsProvider
                value={{
                  handleInvitationChange,
                }}
              >
                <DashboardTable
                  tableState={tableState}
                  setTableState={setTableState}
                  rows={rows}
                  totalSize={totalSize}
                  fetchSuppliers={fetchSuppliers}
                  isDemoable={isDemoable}
                />
              </InvitationsProvider>
            </TabPanel>
            <TabPanel
              value={INVITATIONS_TABS.SUMMARY}
              className={styles.tabPanel}
            >
              <Summary
                defaultSupplyChainId={selectedSupplyChainId}
                supplierInvitationInfo={supplierInvitationInfo}
                onSubmit={handleSendInvitation}
                setSupplyId={setSupplyId}
                setInvitation={setInvitation}
                isDemoable={isDemoable}
              />
            </TabPanel>
          </TabContext>
        </div>
      )}
    </div>
  );
};

export default SuppliersInvitations;
