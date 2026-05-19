import { UNIT_LABELS } from "./unitTypes";

export const getUnitLabel = (type) => {
  return UNIT_LABELS[type] || type;
};