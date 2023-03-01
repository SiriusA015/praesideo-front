import { IconName, SizeProp } from "@fortawesome/fontawesome-svg-core";

export interface PropsModel {
  className?: string;
  customSize?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  icon: IconName;
  color?: string;
  round?: boolean;
  size?: SizeProp;
  status?: "active" | "disabled" | "inactive";
  theme?: "add" | "done" | "blocked" | "ongoing" | "info";
  disabled?: boolean;
  onClick?: () => void;
  solid?: boolean;
}
