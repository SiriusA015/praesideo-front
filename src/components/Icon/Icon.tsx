import React, { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";

import {
  faRandom,
  faSmog,
  faThermometerHalf,
  faWind,
} from "@fortawesome/pro-duotone-svg-icons";

import {
  faCheckCircle,
  faCheck,
  faFileInvoiceDollar,
  faFilter,
  faPlus,
  faTasksAlt,
  faTrash,
  faSlidersV,
  faCaretDown,
  faSearch,
  faFileDownload,
  faCopy
} from "@fortawesome/pro-solid-svg-icons";

import {
  faAbacus,
  faAnalytics,
  faBalanceScaleLeft,
  faBullseyeArrow,
  faFog,
  faFileSignature,
  faLongArrowLeft,
  faLongArrowRight,
  faTimes,
  faTimesCircle,
  faEnvelopeOpenText,
  faUserCheck,
  faUserTimes,
  faBuilding,
  faKeyboard,
  faChartBar,
  faChevronDoubleRight,
  faThermometerThreeQuarters,
  faCog,
  faLock,
  faUserLock,
  faChevronUp,
  faChevronDown,
  faBoxes,
  faClipboardListCheck,
  faSignOut,
  faSlidersH
} from "@fortawesome/pro-light-svg-icons";

/**
 * Models
 */
import { PropsModel } from "./Models";

/**
 * Styles
 */
import styles from "./Icon.module.scss";

library.add(
  faBalanceScaleLeft,
  faAbacus,
  faFog,
  faBullseyeArrow,
  faAnalytics,
  faFileSignature,
  faLongArrowLeft,
  faLongArrowRight,
  faCheckCircle,
  faCheck,
  faTimesCircle,
  faEnvelopeOpenText,
  faUserCheck,
  faUserTimes,
  faBuilding,
  faTimes,
  faPlus,
  faKeyboard,
  faChartBar,
  faChevronDoubleRight,
  faThermometerThreeQuarters,
  faFilter,
  faCog,
  faUserLock,
  faLock,
  faFileInvoiceDollar,
  faChevronUp,
  faChevronDown,
  faTasksAlt,
  faBoxes,
  faClipboardListCheck,
  faEnvelopeOpenText,
  faTrash,
  faRandom,
  faSmog,
  faThermometerHalf,
  faWind,
  faSlidersV,
  faCaretDown,
  faSearch,
  faSignOut,
  faSlidersH,
  faFileDownload,

  faCopy
);

export const Icon: FunctionComponent<PropsModel> = (
  props: PropsModel
): JSX.Element => {
  /**
   * Render method
   */
  const render = (): JSX.Element => {
    const classes: any[] = [styles.wrapper];
    let icon: IconProp | undefined = props.solid
      ? ["fas", props.icon]
      : ["fal", props.icon];
    if (props.className) {
      classes.push(props.className);
    }
    if (props.customSize) {
      classes.push(styles[props.customSize]);
    }
    if (props.status) {
      classes.push(styles[props.status]);
    }
    if (props.onClick) {
      classes.push(styles.clickable);
    }
    if (props.disabled) {
      classes.push(styles.disabled);
    }
    if (props.color) {
      classes.push(styles[props.color]);
    }

    const handleClick = () => {
      !props.disabled && props.onClick && props.onClick();
    };

    return icon ? (
      <span className={classes.join(" ")} onClick={handleClick}>
        <FontAwesomeIcon icon={icon} size={props.size} />
      </span>
    ) : (
      <></>
    );
  };

  return render();
};
