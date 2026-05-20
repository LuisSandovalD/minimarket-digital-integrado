// ========================================
// SALE STATUS BADGE
// ========================================

import React from "react";

export const SaleStatusBadge = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case "COMPLETED":
        return "green";

      case "PENDING":
        return "orange";

      case "CANCELLED":
        return "red";

      default:
        return "gray";
    }
  };

  return (
    <span>
      <span
        style={{
          color: getColor(),
        }}
      >
        {status}
      </span>
    </span>
  );
};
