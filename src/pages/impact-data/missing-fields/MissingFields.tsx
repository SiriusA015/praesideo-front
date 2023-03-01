import { MissingFieldsProps } from "./Models";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem, Typography,
} from "@material-ui/core";
import useMissingFields from "./useMissingFields";
import styles from "./MissingFields.module.scss";
import { Icon } from "../../../components/Icon/Icon";

const MissingFields = (props: MissingFieldsProps) => {
  const { open, onClose, missingFields, label } = useMissingFields(props);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      classes={{
        paper: styles.container,
      }}
    >
      <Icon
        icon="times"
        color="red"
        size="lg"
        onClick={onClose}
        className={styles.closeIcon}
      />
      <DialogTitle><h2>Missing fields for {label}</h2></DialogTitle>
      <DialogContent dividers>
        <List>
          {missingFields.map((field: string, index) => (
            <ListItem key={`missingFields-${index}`}><Typography>{field}</Typography></ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default MissingFields;
