import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Icon } from "../Icon/Icon";

export interface Props {
  date: Date | null;
  className?: string;
}

const TimeFromNow = (props: Props) => {
  const [date, setDate] = useState<string>("");
  useEffect(() => {
    setDate(moment(props.date).startOf("minute").fromNow());
    const interval = setInterval(() => {
      setDate(moment(props.date).startOf("minute").fromNow());
    }, 60000);
    return () => clearInterval(interval);
  }, [props.date]);
  if (date)
    return (
      <div className={props.className}>
        <Icon icon={"check-circle"} customSize={"sm"} color={"green"} solid />
        Last saved:
        <span>{date}</span>
      </div>
    );
  else return <></>;
};

export default TimeFromNow;
