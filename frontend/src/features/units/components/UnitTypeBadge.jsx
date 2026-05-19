import { getUnitLabel }
from "../utils/unitHelpers";

export default function UnitTypeBadge({
  type
}) {

  return (
    <span>
      {getUnitLabel(type)}
    </span>
  );

}