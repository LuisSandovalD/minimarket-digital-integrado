// ========================================
// features/account/utils/account.permissions.js
// ========================================

export function canManageUsers(
  role
) {

  return [

    "ADMIN",

    "MANAGER",

  ].includes(role);

}

export function canDeleteAccount(
  role
) {

  return role === "ADMIN";

}

export function canViewStats(
  role
) {

  return [

    "ADMIN",

    "MANAGER",

    "SUPERVISOR",

  ].includes(role);

}