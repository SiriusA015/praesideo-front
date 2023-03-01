import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import {
  ACTIVATE_ACCOUNT_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  EMAIL_SENT_ROUTE,
  FORGET_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  ROOT_ROUTE,
  SET_UP_SUBSCRIPTION_ROUTE,
  SIGNUP_ROUTE,
} from "../../constants";
import { useAlert } from "../../helpers/hooks/useAlert";
import { useAuth } from "../../helpers/useAuth";
import LoginService from "../../services/LoginService";
import { SECTIONS } from "./constants";
import { ActivationMessage } from "./Models";

export const getActiveSection = (pathname: string) => {
  if (pathname.includes(LOGIN_ROUTE)) {
    return SECTIONS.LOGIN;
  } else if (pathname.includes(ACTIVATE_ACCOUNT_ROUTE)) {
    return SECTIONS.ACTIVATE_ACCOUNT;
  } else if (pathname.includes(CHANGE_PASSWORD_ROUTE)) {
    return SECTIONS.CHANGE_PASSWORD;
  } else if (pathname.includes(SIGNUP_ROUTE)) {
    return SECTIONS.PERSONAL_DATA;
  } else if (pathname.includes(FORGET_PASSWORD_ROUTE)) {
    return SECTIONS.FORGET_PASSWORD;
  } else if (pathname.includes(EMAIL_SENT_ROUTE)) {
    return SECTIONS.EMAIL_SENT;
  } else if (pathname.includes(SET_UP_SUBSCRIPTION_ROUTE)) {
    return SECTIONS.SET_UP_SUBSCRIPTION;
  }
  return "";
};

const useLogin = () => {
  const location = useLocation();
  const history = useHistory();
  const params = useParams<any>();
  const [activeSection, setActiveSection] = useState<string>(
    getActiveSection(location.pathname),
  );
  const [activationMessage, setActivationMessage] =
    useState<ActivationMessage>();
  const [error, setError] = useState<any>();
  const { login } = useAuth();
  const [, setAlert] = useAlert();

  useEffect(() => {
    if (activeSection === SECTIONS.ACTIVATE_ACCOUNT) {
      LoginService.activateAccount(params.activationString)
        .then((response) => {
          setActivationMessage({
            valid: true,
            message: "Account was successfully confirmed",
          });
        })
        .catch((error) => {
          setActivationMessage({ valid: false, message: "Account not found" });
        });
    }
  }, []);

  const handleClickOnAlternativeButton = () => {
    if (activeSection === SECTIONS.LOGIN) {
      history.push(SIGNUP_ROUTE);
    } else if (activeSection === SECTIONS.PERSONAL_DATA) {
      history.push(LOGIN_ROUTE);
    }
  };
  const handleClickOnGoToLogin = () => {
    history.push(LOGIN_ROUTE);
  };
  const handleClickOnSubmitFormButton = async (value: any) => {
    switch (activeSection) {
      case SECTIONS.PERSONAL_DATA: {
        const { error } = await LoginService.register({
          email: value.email,
          password: value.password,
          cid: Number.parseInt(value.cid) || undefined,
        });
        if (!error) {
          setActiveSection(SECTIONS.SIGNUP_SUCCESS);
        } else {
          setAlert({ text: error, severity: "error" });
        }
        break;
      }
      case SECTIONS.LOGIN: {
        const { error } = await login(value.email, value.password);
        if (!error) {
          history.push(ROOT_ROUTE);
        } else {
          setAlert({ text: error, severity: "error" });
        }
        break;
      }
      default:
        break;
    }
  };

  const handleAlertClose = () => {
    setError("");
  };

  return {
    state: { activeSection, activationMessage, error },
    handleClickOnAlternativeButton,
    handleClickOnSubmitFormButton,
    handleClickOnGoToLogin,
    handleAlertClose,
  };
};

export default useLogin;
