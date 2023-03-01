import { RightMenuProps } from "./RightMenu.model";
import styles from "./RightMenu.module.scss";
import { Icon } from "../Icon/Icon";

const RightMenu = (props: RightMenuProps) => {
  return (
    <div className={styles.container}>
      {props.items.map((element, index) => {
        return (
          <div className={styles.item} key={`item-${index}`}>
            <div className={styles.itemDescription}>
              {/* <Icon
                size={"2x"}
                className={styles.icon}
                color={"grey"}
                {...element.iconProps}
              /> */}
              <h2 className={styles.label}>{element.label}</h2>
            </div>
            {element.items?.map((subElement, subIndex) => {
              return (
                <div
                  className={ props.activeItem.includes(subElement.path)? `${styles.step} ${styles.active}` : styles.step}
                  key={`subElement-${index}-${subIndex}`}
                  onClick={() => {
                    props.onClickItem && props.onClickItem(subElement.path);
                  }}
                >
                  <h3> {subElement.label} </h3>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default RightMenu;
