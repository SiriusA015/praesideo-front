import { memo, useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  Chip,
  Drawer,
  TextField,
} from "@material-ui/core";

import MainService from "../../../services/MainService";
import { useAuth } from "../../../helpers/useAuth";
import { YearType } from "../../../models/DateTypes";
import { DATE_FORMAT } from "../../../constants";
import { AvailableNumberType } from "../models";
import styles from "../styles.module.scss";
import { Icon } from "../../../components/Icon/Icon";
import { Autocomplete } from "@material-ui/lab";

type PerformanceToolbarProps = {
  yearState: [
      YearType | undefined,
    React.Dispatch<React.SetStateAction<YearType | undefined>>
  ];
  suppliers?: AvailableNumberType;
  lastComputed?: string;
};

const PerformanceToolbar = ({
                              yearState,
                              suppliers,
                              lastComputed,
                            }: PerformanceToolbarProps) => {
  const { user } = useAuth();
  const [year, setYear] = yearState;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [calendarYears, setCalendarYears] = useState<YearType[]>();

  const fetchYears = async () => {
    const { data } = await MainService.getTemperatureAlignmentYears(
      user.companyId,
    );
    if (data) {
      setCalendarYears(data);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    if (calendarYears) {
      const actualYear = calendarYears.find(
        ({ label }) => label === new Date().getFullYear().toString(),
      );
      if (actualYear) {
        setYear(actualYear);
      } else {
        setYear(calendarYears[0]);
      }
    }
  }, [calendarYears]);

  const handleOpenFilters = () => {
    setDialogOpen(true);
  };

  const handleCloseFilters = () => setDialogOpen(false);

  const handleSubmit = ( year: YearType) => {
    setYear(year);
    setDialogOpen(false);
  };

  return (
    <div className={styles.toolbar}>
      <h3>
        {suppliers &&
          `Available suppliers: ${suppliers.available} / ${suppliers.total}`}
      </h3>
      {lastComputed && (
        <h3>
          Last computed: {moment(lastComputed).format(DATE_FORMAT)}
        </h3>
      )}
      {year && (
        <Chip
          key={year.label}
          label={year.label}
          className={styles.chip}
        />
      )}
      <Button
        className={styles.filterButton}
        onClick={handleOpenFilters}
      >
        <Icon
          icon="sliders-h"
          size="lg"
          className={styles.filterIcon}
        />
      </Button>
      <Drawer
        anchor="right"
        open={isDialogOpen}
        onClose={handleCloseFilters}
      >
        <div className={styles.filterDrawerContainer}>
          <h2>Filters</h2>
          <Autocomplete
            blurOnSelect
            disableClearable
            onChange={(event, value) => handleSubmit(value)}
            value={year}
            options={calendarYears || []}
            getOptionLabel={(option) => option.label || ""}
            getOptionSelected={(option, value) => {
              return value.value === option.value;
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  variant="filled"
                  color="secondary"
                  label={"Year"}
                />
              );
            }}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default memo(PerformanceToolbar);
