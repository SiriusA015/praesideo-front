import { Snackbar as MuiSnackbar } from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";

import { useAlert } from "../../helpers/hooks/useAlert";

const Alert = () => {
  const [alert, setAlert] = useAlert();

  const handleClose = () => {
    setAlert(null);
  };

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={Boolean(alert)}
      autoHideDuration={alert?.duration}
      onClose={handleClose}
    >
      {alert ? (
        <MuiAlert onClose={handleClose} severity={alert?.severity || "success"}>
          {alert?.text}
        </MuiAlert>
      ) : (
        <div />
      )}
    </MuiSnackbar>
  );
};

export default Alert;
