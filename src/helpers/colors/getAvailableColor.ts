import { COLOR } from "../../constants";

const colors = Object.values(COLOR);
let assigned: Record<string, string> = {};

export const getAvailableColor = (name: string) =>
  assigned[name] ||
  (assigned[name] = colors[Object.keys(assigned).length % colors.length]);
