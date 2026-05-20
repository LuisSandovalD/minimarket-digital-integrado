// ========================================
// features/movements/components/MovementTypeBadge.jsx
// ========================================

import { getMovementStyles } from "../helpers/movementStyles.helper";

export default function MovementTypeBadge({ type }) {
  const styles = getMovementStyles(type);

  // ========================================
  // ICON COMPONENT
  // ========================================

  const Icon = styles.icon;

  return (
    <span
      className={`
      inline-flex
      items-center
      gap-1
      px-3
      py-1
      rounded-full
      text-xs
      font-medium
      ${styles.bg}
      ${styles.text}
    `}
    >
      {/* IMPORTANT */}
      <Icon
        className="
        w-3
        h-3
      "
      />

      {type}
    </span>
  );
}
