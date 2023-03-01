import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { DEV_SETTING_CONFIG, PROD_SETTING_CONFIG } from "./configs";
import SettingsService from "../../services/SettingsService";
import { useAuth } from "../../helpers/useAuth";
import { SECTIONS } from "./constants";
import { GridRowModel } from "@material-ui/data-grid";
import { SettingsConfig } from "./Models";
import { PermissionModel } from "../../models/permission.model";
import { BankAccountModel } from "../../models/billing.model";

const useSettings = () => {
  const location = useLocation();
  const history = useHistory();
  const { user } = useAuth();
  const [error, setError] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<GridRowModel>();
  const [activeItem] = useState<string>(
    location.pathname.slice(location.pathname.lastIndexOf("/") + 1)
  );
  const { isProduction } = useAuth();
  const [activeConfig, setActiveConfig] = useState<SettingsConfig | undefined>(
    (isProduction ? PROD_SETTING_CONFIG : DEV_SETTING_CONFIG).find(
      (conf: any) => conf.value === activeItem
    )
  );
  const [data, setData] = useState<any[]>([]);
  const [bankAccount, setBankAccount] = useState<BankAccountModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      switch (activeItem) {
        case SECTIONS.USER_ROLES:
          setData(
            await SettingsService.getUsersWithPermissions(user.companyId)
          );
          break;

        case SECTIONS.BILLING_PAYMENT:
          setData(
            await SettingsService.getBilling(user.companyId)
          );
          setBankAccount(
            await SettingsService.getBankAccount()
          );
          break;

        default:
          break;
      }
    };

    fetchData();
  }, []);

  const handleAlertClose = () => {
    setError("");
  };

  const handleClickOnItem = (path: string) => {
    history.push("/" + path);
  };

  const onFormSubmit = async (data: PermissionModel) => {
    if (activeItem === SECTIONS.USER_ROLES) {
      setData(
        await SettingsService.changeUserPermission({
          ...selectedRow,
          ...data,
        })
      );
    }
  };

  return {
    activeItem,
    activeConfig,
    data,
    bankAccount,
    error,
    selectedRow,
    onFormSubmit,
    setSelectedRow,
    handleClickOnItem,
    handleAlertClose,
  };
};

export default useSettings;
