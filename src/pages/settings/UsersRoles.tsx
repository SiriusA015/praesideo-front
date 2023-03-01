import { Icon } from "../../components/Icon/Icon";
import styles from "./Settings.module.scss";
import useSettings from "./useSettings";
import CustomTable from "../../components/CustomTable/CustomTable";

const UsersRoles = () => {
  const { activeConfig, data, onFormSubmit } = useSettings();

  return (
    <>
      <div className={styles.title}>
        {/* {activeConfig?.iconProps && (
          <Icon {...activeConfig?.iconProps} className={styles.icon} />
        )} */}
        <h2>{activeConfig?.label}</h2>
      </div>
      {data && activeConfig?.type === "table" ? (
        <CustomTable
          columns={activeConfig.tableConfig}
          formConfig={activeConfig.formConfig}
          data={data}
          onFormSubmit={onFormSubmit}
          isDataEditable={true}
          isDataOpenable={true}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default UsersRoles;
