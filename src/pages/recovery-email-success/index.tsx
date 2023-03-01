import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Icon } from "../../components/Icon/Icon";
import { LOGIN_ROUTE } from "../../constants";
import styles from "../login/login.module.scss";

const RecoveryEmailSuccess = () => {
  const history = useHistory();

  const returnToLogin = () => {
    history.push(LOGIN_ROUTE);
  };

  return (
    <div className={styles.emailConfirmed}>
      <Icon icon="envelope-open-text" size="3x" color="white" />
      <h2>
        A recovery email was sent to your email address.
        <p>
          Please double check in the <b>spam</b> folder
        </p>
      </h2>
      <Button variant="outlined" color="primary" onClick={returnToLogin}>
        Go to login
      </Button>
    </div>
  );
};

export default RecoveryEmailSuccess;
