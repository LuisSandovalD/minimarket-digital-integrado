import {
  ROLE_HIERARCHY,
} from "./roleHierarchy";

// ========================================
// CAN MANAGE
// ========================================

export const canManageUser =
  (
    currentRole,
    targetRole
  ) => {

    return (
      ROLE_HIERARCHY[
        currentRole
      ]?.level >
      ROLE_HIERARCHY[
        targetRole
      ]?.level
    );

  };

// ========================================
// CAN VIEW
// ========================================

export const canViewRole =
  (
    currentRole,
    targetRole
  ) => {

    return ROLE_HIERARCHY[
      currentRole
    ]?.canView.includes(
      targetRole
    );

  };