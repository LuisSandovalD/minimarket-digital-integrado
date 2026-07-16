// ========================================
// HELPERS
// ========================================

import { AlertCircle, ArrowDown, ArrowUp, PackageX, RefreshCcw } from "lucide-react";

export const getMovementStyles = (type) => {
  switch (type) {
    case "ADD":
    case "PURCHASE":
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: ArrowUp,
      };

    case "REMOVE":
    case "SALE":
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: ArrowDown,
      };

    case "DAMAGED":
      return {
        bg: "bg-orange-100",
        text: "text-orange-700",
        icon: PackageX,
      };

    case "TRANSFER":
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: RefreshCcw,
      };

    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-700",
        icon: AlertCircle,
      };
  }
};
