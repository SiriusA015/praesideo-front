import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { FormValue } from "../../components/CustomForm/CustomForm.model";
import CustomForm from "../../components/CustomForm/CustomForm";
import { useAlert } from "../../helpers/hooks/useAlert";
import { EMAIL_SENT_ROUTE, LOGIN_ROUTE } from "../../constants";
import LoginService from "../../services/LoginService";
import styles from "../login/login.module.scss";
import { forgetPasswordSectionConfig } from "./config";

const ForgetPassword = () => {
  const {
    title,
    subTitle,
    description,
    formConfig,
    alternativeOptionQuestion,
    alternativeOptionButtonLabel,
  } = forgetPasswordSectionConfig;
  const history = useHistory();
  const [, setAlert] = useAlert();

  const returnToLogin = () => {
    history.push(LOGIN_ROUTE);
  };

  const handleSubmit = async (value: FormValue) => {
    const { error } = await LoginService.sendRecoveryEmail({
      email: value.email as string,
    });
    if (!error) {
      history.push(EMAIL_SENT_ROUTE);
    } else {
      setAlert({ text: error, severity: "error" });
    }
  };

  return (
    <div className={styles.form}>
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
      <h3 className={styles.sectionDescription}>{description}</h3>
      <CustomForm
        config={formConfig}
        onSubmit={handleSubmit}
        isDataEditable={true}
      />
      <p className={styles.noAccount}>
        <span>{alternativeOptionQuestion}</span>
      </p>
      <Button variant="outlined" onClick={returnToLogin}>
        {alternativeOptionButtonLabel}
      </Button>
    </div>
  );
};

export default ForgetPassword;
