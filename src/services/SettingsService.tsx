import axios from "axios";
import { PermissionModel } from "../models/permission.model";
import { BillingModel, BankAccountModel } from "../models/billing.model";

import {
  CHANGE_USER_PERMISSIONS_ENDPOINT,
  CHANGE_USER_STATUS_ENDPOINT,
  USERS_PERMISSIONS_ENDPOINT,
  BILLING_ENDPOINT,
  BANKACCOUN_ENDPOINT
} from "../constants";

const SettingsService = {
  getUsersWithPermissions: async (companyId: number) => {
    const result = await axios.get(
      `${USERS_PERMISSIONS_ENDPOINT}?companyId=${companyId}`
    );

    return result.data
      ?.sort((a: PermissionModel, b: PermissionModel) =>
        a.username.localeCompare(b.username)
      )
      .map((result: PermissionModel) => ({
        ...result,
        id: result.username,
      }));
  },
  changeUserPermission: async (data: PermissionModel) => {
    await axios.post(`${CHANGE_USER_PERMISSIONS_ENDPOINT}`, {
      ...data,
      permission: data.impactPermission,
    });

    await axios.post(
      `${CHANGE_USER_STATUS_ENDPOINT}?username=${data.username}&enabled=${data.enabled}`
    );

    return await SettingsService.getUsersWithPermissions(data.companyId);
  },
  getBilling: async (companyId: number) => {
    const result = await axios.get(
      `${BILLING_ENDPOINT}/${companyId}`
    );
    return result.data.map((result: BillingModel) => ({
      ...result,
      id: result.id,
    }));
  },
  getBankAccount: async () => {
    const result = await axios.get(
      `${BANKACCOUN_ENDPOINT}`
    );
    console.log('this is bankAccount', result);
    return result.data.map((result: BankAccountModel) => ({
      ...result
    }));
  },
};

export default SettingsService;
