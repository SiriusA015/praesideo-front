import { useHistory } from "react-router-dom";
import { Box, Grid, List, ListItem, ListItemText } from "@material-ui/core";

import { Icon } from "../../components/Icon/Icon";
import CustomForm from "../../components/CustomForm/CustomForm";
import { FormValue } from "../../components/CustomForm/CustomForm.model";
import LoginService from "../../services/LoginService";
import { LOGIN_ROUTE } from "../../constants";
import useQuery from "../../helpers/hooks/useQuery";
import { useAlert } from "../../helpers/hooks/useAlert";
import styles from "./change-password-form.module.scss";
import config from "./config";

const ChangePasswordForm = () => {
  const history = useHistory();
  const query = useQuery();
  const [, setAlert] = useAlert();

  const handleSubmit = async (values: FormValue) => {
    const { error } = await LoginService.changeForgetPassword(
      values,
      query.get("key"),
    );
    if (!error) {
      history.push(LOGIN_ROUTE);
      setAlert({ text: "Successfully changed password", duration: 5000 });
    } else {
      setAlert({ text: error, severity: "error" });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Change password</h1>
      <div className={styles.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomForm
              config={config}
              onSubmit={handleSubmit}
              isDataEditable={true}
            />
            <div className={styles.hintContainer}>
              <Box display="flex" alignItems="center">
                <Icon icon="lock" className={styles.hintContainerTitleIcon} />
                <h3>Your password must contain:</h3>
              </Box>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="At least 8 characters"
                    primaryTypographyProps={{ variant: "body1" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="A mix of uppercase and lowercase letters"
                    primaryTypographyProps={{
                      variant: "body1",
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="A mix of letters and numbers"
                    primaryTypographyProps={{ variant: "body1" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Inclusion of at least one special character from below list @#$%^&+=*!?/"
                    primaryTypographyProps={{ variant: "body1" }}
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
