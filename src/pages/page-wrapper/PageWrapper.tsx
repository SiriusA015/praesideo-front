import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "./PageWrapper.module.scss";

const PageWrapper = (Component: () => JSX.Element) => {
  return (
    <div className={styles.container}>
      <SideMenu />
      <Component />
    </div>
  );
};

export default PageWrapper;
