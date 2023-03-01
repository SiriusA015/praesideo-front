import { useMemo, useState } from "react";

import MainService from "../../services/MainService";
import { YearRepresentationOption } from "../../models/Api.model";
import { useAlert } from "./useAlert";

export const useRepresentationYears = () => {
  const [, setAlert] = useAlert();
  const [yearsList, setYearsList] = useState<YearRepresentationOption[]>();

  const fetchYears = async () => {
    const { error, data } = await MainService.getRepresentationYears();
    if (error) {
      setAlert({ text: error, severity: "error" });
    } else {
      setYearsList(data as YearRepresentationOption[]);
    }
  };

  const financialYearList = useMemo(() => {
    return yearsList
      ? yearsList
          .map((element) => ({
            label: element.financialYear,
            value: element.yearRepresentationId,
          }))
          .sort((a, b) => a.label.localeCompare(b.label))
      : null;
  }, [yearsList]);

  const calendarYearList = useMemo(() => {
    return yearsList
      ? yearsList
          .map((element) => ({
            label: element.calendarYear.toString(),
            value: element.yearRepresentationId,
          }))
          .sort((a, b) => a.label.localeCompare(b.label))
      : null;
  }, [yearsList]);

  return {
    fetchYears,
    financialYears: financialYearList,
    calendarYears: calendarYearList,
  }
};
