import axios from "axios";

import { FormValue } from "../components/CustomForm/CustomForm.model";
import {
  ACTIVATE_ACCOUNT_ENDPOINT,
  CHANGE_PASSWORD_ENDPOINT,
  CHECK_EXISTING_DOMAIN_ENDPOINT,
  FORGET_PASSWORD_ENDPOINT,
  LOGIN_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT,
  REGISTER_ENDPOINT,
} from "../constants";
import { errorHandler } from "../helpers/errorHandler";

const LoginService = {
  activateAccount: async (activationString: string) => {
    const response = await axios.post(
      ACTIVATE_ACCOUNT_ENDPOINT,
      {},
      {
        params: {
          activationString,
        },
      }
    );
    return response.data;
  },
  checkExistingDomain: async (email: string) => {
    const response = await axios.post(
      `${CHECK_EXISTING_DOMAIN_ENDPOINT}/${email}`
    );
    return response.data;
  },
  login: async (body: any) => {
    try {
      const response = await axios.post(LOGIN_ENDPOINT, body);
      return response.data;
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getRefreshToken: async (refreshToken: string) => {
    const response = await axios.post(REFRESH_TOKEN_ENDPOINT, {
      refreshToken,
    });
    return response.data;
  },
  register: async (body: any) => {
    try {
      const response = await axios.post(REGISTER_ENDPOINT, body);
      return response.data;
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  sendRecoveryEmail: async (body: { email: string }) => {
    try {
      const response = await axios.post(FORGET_PASSWORD_ENDPOINT, body);
      return response.data;
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  changeForgetPassword: async (
    { password, reTypePassword }: FormValue,
    key: string | null
  ) => {
    try {
      const response = await axios.post(
        `${CHANGE_PASSWORD_ENDPOINT}?key=${key}`,
        {
          newPassword: password,
          confirmPassword: reTypePassword,
        }
      );
      return response.data;
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
};

export default LoginService;
