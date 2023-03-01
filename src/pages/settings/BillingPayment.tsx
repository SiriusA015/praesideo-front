import { DataGrid } from "@material-ui/data-grid";

import { Icon } from "../../components/Icon/Icon";
import styles from "./Settings.module.scss";
import useSettings from "./useSettings";
import { BankAccountList } from "./configs"
import CustomTable from "../../components/CustomTable/CustomTable";

const BillingPayment = () => {
  const { activeConfig, data, bankAccount, setSelectedRow } = useSettings();
  return (
    <>
      <div className={styles.title}>
        {/* {activeConfig?.iconProps && (
          <Icon {...activeConfig?.iconProps} className={styles.icon} />
        )} */}
        <h2 className={styles.label}>{activeConfig?.label}</h2>
      </div>
      {data && activeConfig?.type === "table" && (
        <div className={styles.table}>
          {/* <DataGrid
            disableSelectionOnClick 
            className={styles.font12}
            rows={data}
            columns={activeConfig.gridConfig}
            pageSize={5}
            rowsPerPageOptions={[5]}
          
          /> */}
          <CustomTable
            columns={activeConfig.tableConfig}
            formConfig={activeConfig.formConfig}
            data={data}
            isDataOpenable={false}
            isDataEditable={true}
          />
        </div>
      )}
      <BankAccountList bankAccount = { bankAccount }></BankAccountList>
    </>
  );
};

export default BillingPayment;
