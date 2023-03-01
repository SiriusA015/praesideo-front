import { useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";

import styles from "./SideMenu.module.scss";

type SideMenuSectionProps = {
  title: string;
  items: Array<{
    text: string;
    href: string;
  }>;
};

const SideMenuSection = ({ title, items }: SideMenuSectionProps) => {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div className={styles.menuItems}>
      <h5>{title}</h5>
      {items.map(({ href, text }) => (
        <div
          className={clsx(styles.item, pathname === href && styles.activeItem)}
          onClick={() => history.push(href)}
          key={href}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default SideMenuSection;
