import MuiChip from "@material-ui/core/Chip";

import { STATUS } from "../../constants";
import styles from "./styles.module.scss";

type StatusProps = {
  variant: STATUS;
};

const Status = ({ variant }: StatusProps) => {
  switch (variant) {
    case STATUS.AVAILABLE:
      return <MuiChip label="Available" className={styles.available} />;

    case STATUS.PENDING:
      return <MuiChip label="Pending" className={styles.pending} />;

    case STATUS.PARTIAL:
      return <MuiChip label="Partial Match" className={styles.partial} />;

    case STATUS.ONBOARD_ME:
      return <MuiChip label="Onboard Me" className={styles.onboard} />;

    case STATUS.INCOMPLETE:
      return <MuiChip label="Incomplete" className={styles.incomplete} />;

    case STATUS.COMPLETE:
      return <MuiChip label="Complete" className={styles.complete} />;

    case STATUS.INVITE_ME:
      return <MuiChip label="Invite Me" className={styles.invite} />;

    case STATUS.INVITED:
      return <MuiChip label="Invited" className={styles.invited} />;

    default:
      return null;
  }
};

export default Status;
