import { SubmitMissingFieldsProps } from "./Models";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem, Typography,
} from "@material-ui/core";
import styles from "./MissingFields.module.scss";
import { Icon } from "../../../components/Icon/Icon";

const SubmitMissingFields = (props: SubmitMissingFieldsProps) => {
  // const { open, onClose, label } = useMissingFields(props);

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      classes={{
        paper: styles.container,
      }}
    >
      <Icon
        icon="times"
        color="red"
        size="lg"
        onClick={props.onClose}
        className={styles.closeIcon}
      />
      <DialogContent>
        <h2>{props.label}</h2>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitMissingFields;
