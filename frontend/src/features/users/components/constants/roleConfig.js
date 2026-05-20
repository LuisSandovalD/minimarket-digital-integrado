// ========================================
// components/users/constants/roleConfig.js
// ========================================

import { ShieldCheck, UserCog, Layers3, User, Eye } from "lucide-react";

export const ROLE_CONFIG = {
  ADMIN: {
    icon: ShieldCheck,

    className: `
      bg-rose-500/10
      text-rose-400
      border-rose-500/20
    `,
  },

  MANAGER: {
    icon: UserCog,

    className: `
      bg-sky-500/10
      text-sky-400
      border-sky-500/20
    `,
  },

  SUPERVISOR: {
    icon: Layers3,

    className: `
      bg-amber-500/10
      text-amber-400
      border-amber-500/20
    `,
  },

  EMPLOYEE: {
    icon: User,

    className: `
      bg-emerald-500/10
      text-emerald-400
      border-emerald-500/20
    `,
  },

  VIEWER: {
    icon: Eye,

    className: `
      bg-slate-500/10
      text-slate-400
      border-slate-500/20
    `,
  },
};

export const NEXT_ROLE = {
  ADMIN: "MANAGER",

  MANAGER: "SUPERVISOR",

  SUPERVISOR: "EMPLOYEE",
};

export const BUTTON_LABEL = {
  ADMIN: "Ver Gerentes",

  MANAGER: "Ver Supervisores",

  SUPERVISOR: "Ver Empleados",
};
