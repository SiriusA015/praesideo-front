import {
  LinearProgress,
  List,
  ListItem,
  Paper,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";

import { HalfDoughnutProbability } from "../../Charts";
import styles from "./styles.module.scss";

export type CardCategoryNumbers = {
  label: string;
  percentage: number;
};

type CardProps = {
  title: string;
  subTitle: string;
  result: { label: string; value: number };
  start: { label: string; value: number };
  end: { label: string; value: number };
  variant?: "temperature" | "probability";
  category: string;
  categoryValues?: CardCategoryNumbers[];
};

const TEMPERATURE = "temperature";
const PROBABILITY = "probability";

export const VerticalStatCard = ({
                                   variant = TEMPERATURE,
                                   title,
                                   subTitle,
                                   result,
                                   start,
                                   end,
                                   category,
                                   categoryValues,
                                 }: CardProps) => {
  return (
    <Paper
      className={clsx(styles.card, styles.widget, {
        [styles.temperatureCard]: variant === TEMPERATURE,
        [styles.probabilityCard]: variant === PROBABILITY,
      })}
      variant="elevation"
      elevation={0}
    >
      <h2>{title} <b>{subTitle}</b></h2>
      <HalfDoughnutProbability value={result} start={start} end={end} />
      <div className={styles.categoryContainer}>
        {Boolean(categoryValues?.length) && (
          <h3 className={styles.description}>
            Number of suppliers by {category}
          </h3>
        )}
        <List>
          {categoryValues?.map(({ label, percentage }, index) => (
            <ListItem key={label} className={styles.categoryItem}>
              <Typography><b>{label}</b></Typography>
              <LinearProgress
                variant="determinate"
                value={percentage}
                className={clsx(styles.progress, {
                  [styles.progressGreen]: index === 0,
                  [styles.progressOlive]: index === 1,
                  [styles.progressOrange]: index === 2,
                  [styles.progressRed]: index === 3,
                })}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  );
};
