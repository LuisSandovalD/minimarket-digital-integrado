// ========================================
// features/account/utils/account.helpers.js
// ========================================

import {
  ROLE_LABELS,
} from "../constants/account.constants";

/* ======================================
 * ROLE LABEL
 * ==================================== */

export function getRoleLabel(role) {

  return (
    ROLE_LABELS[role] ||
    role
  );

}

/* ======================================
 * STATUS LABEL
 * ==================================== */

export function getStatusLabel(
  isActive
) {

  return isActive
    ? "Activo"
    : "Inactivo";

}

/* ======================================
 * USER INITIALS
 * ==================================== */

export function getUserInitials(
  name = ""
) {

  return name
    .split(" ")
    .map((word) =>
      word[0]
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();

}

/* ======================================
 * FORMAT DATE
 * ==================================== */

export function formatAccountDate(
  date
) {

  if (!date)
    return "-";

  return new Date(date)
    .toLocaleDateString(
      "es-PE",
      {

        year: "numeric",

        month: "long",

        day: "numeric",

      }
    );

}