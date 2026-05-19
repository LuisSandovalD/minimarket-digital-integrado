// ========================================
// ROLE HIERARCHY
// ========================================

export const ROLE_HIERARCHY = {

  ADMIN: {
    level: 5,

    canView: [
      "MANAGER",
      "SUPERVISOR",
      "EMPLOYEE",
      "VIEWER",
    ],

    nextRole: "MANAGER",

    nextLabel:
      "Ver Gerentes",
  },

  MANAGER: {
    level: 4,

    canView: [
      "SUPERVISOR",
      "EMPLOYEE",
      "VIEWER",
    ],

    nextRole: "SUPERVISOR",

    nextLabel:
      "Ver Supervisores",
  },

  SUPERVISOR: {
    level: 3,

    canView: [
      "EMPLOYEE",
      "VIEWER",
    ],

    nextRole: "EMPLOYEE",

    nextLabel:
      "Ver Empleados",
  },

  EMPLOYEE: {
    level: 2,

    canView: [],

    nextRole: null,

    nextLabel: null,
  },

  VIEWER: {
    level: 1,

    canView: [],

    nextRole: null,

    nextLabel: null,
  },

};