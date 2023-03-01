import { PropsModel } from "../Icon/Models";

export interface RightMenuProps {
  items: RightMenuItem[];
  activeItem: string;
  onClickItem: (path: string) => void;
}

export interface RightMenuItem {
  label: string;
  path: string;
  iconProps: PropsModel;
  items?: RightMenuItem[];
}
