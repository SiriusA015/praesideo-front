import { useHistory } from "react-router-dom";
import { SideMenuProps } from "./SideMenu.model";
import styles from "./SideMenu.module.scss";
import PraesideoLogo from "../../images/logo.png";
import { useAuth } from "../../helpers/useAuth";
import packageJson from "../../../package.json";
import SideMenuSection from "./SideMenuSection";
import {
  IMPACT_MEASEMENT_ONLY,
  IMPACT_PERFORMANCE,
  TRACE_ITEMS,
} from "./constants";
import { Icon } from "../Icon/Icon";

const SideMenu = (props: SideMenuProps) => {
  const { logout, isTraceAvailable, isImpactPerformanceAvailable } = useAuth();
  const history = useHistory();
  const handleClickOnLogout = () => {
    logout();
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src={PraesideoLogo} alt="logo" className={styles.logo} />
        <SideMenuSection
          title="IMPACT"
          items={
            isImpactPerformanceAvailable
              ? IMPACT_PERFORMANCE
              : IMPACT_MEASEMENT_ONLY
          }
        />
        {isTraceAvailable && (
          <SideMenuSection title="TRACE" items={TRACE_ITEMS} />
        )}
      </div>
      <div className={styles.footer}>
        <hr/>
        <div className={styles.footerItem} onClick={handleClickOnLogout}>
          <Icon icon="sign-out" color="white" customSize="md" />
          <span className={styles.footerText}>Logout</span>
        </div>
        <div className={styles.footerItem} onClick={() => history.push("user-roles")}>
          <Icon icon="cog" color="white" customSize="md" />
          <span className={styles.footerText}>Settings</span>
        </div>
        <p className={styles.footerItem}>version {packageJson.version}</p>
      </div>
    </div>
  );
};

export default SideMenu;
