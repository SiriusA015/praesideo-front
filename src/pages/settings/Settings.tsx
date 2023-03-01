import styles from "./Settings.module.scss";
import { Alert } from "@material-ui/lab";
import useSettings from "./useSettings";
import RightMenu from "../../components/RightMenu/RightMenu";
import { DEV_ITEMS, PROD_ITEMS, MEMBER_ITEMS } from "./configs";
import { SECTIONS } from "./constants";
import UsersRoles from "./UsersRoles";
import BillingPayment from "./BillingPayment";
import { useAuth } from "../../helpers/useAuth";
import { useEffect, useState } from "react";
import SettingsService from "../../services/SettingsService";

const Settings = () => {
  const { activeItem, error, handleClickOnItem, handleAlertClose } =
    useSettings();
  const { isProduction, user } = useAuth();
  const [userRoleState, setUserRoleState] = useState(false);
  useEffect(() => {
    getUserRole();
  }, []);

  const getUserRole = async () => {
    const userList = await SettingsService.getUsersWithPermissions(user.companyId);
    
    const selectUser = userList.find((item: any)=>{
      return (item.username == user.username);
    });
    if (selectUser.role == "MEMBER"){
      setUserRoleState(false);
    }else{setUserRoleState(true);}
  } 

  const renderPage = () => {
    switch (activeItem) {
      case SECTIONS.USER_ROLES:
        return <UsersRoles />;
      case SECTIONS.BILLING_PAYMENT:
        return <BillingPayment />;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      {error && (
        <Alert
          severity="error"
          className={styles.alert}
          onClose={handleAlertClose}
        >
          {error}
        </Alert>
      )}
      <div className={styles.mainSection}>
        <div className={styles.widget}>
          {renderPage()}
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.widget}>
          <RightMenu
            items={userRoleState?(isProduction ? PROD_ITEMS : DEV_ITEMS):MEMBER_ITEMS}
            activeItem={activeItem}
            onClickItem={handleClickOnItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
