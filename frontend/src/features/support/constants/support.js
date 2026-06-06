// ========================================
// constants/support.js
// ========================================

/**
 * Estados de los Tickets con sus respectivas etiquetas y estilos visuales
 */
export const TICKET_STATUSES = {
  OPEN: {
    value: "OPEN",
    label: "Abierto (OPEN)",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  IN_PROGRESS: {
    value: "IN_PROGRESS",
    label: "En Progreso (IN_PROGRESS)",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  WAITING: {
    value: "WAITING",
    label: "En Espera (WAITING)",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  RESOLVED: {
    value: "RESOLVED",
    label: "Resuelto (RESOLVED)",
    color: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  },
  CLOSED: {
    value: "CLOSED",
    label: "Cerrado (CLOSED)",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  REOPENED: {
    value: "REOPENED",
    label: "Reabierto (REOPENED)",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
};

/**
 * Niveles de Prioridad para la creación de tickets
 */
export const TICKET_PRIORITIES = {
  LOW: {
    value: "LOW",
    label: "Baja (LOW)",
    color: "text-slate-400",
  },
  MEDIUM: {
    value: "MEDIUM",
    label: "Media (MEDIUM)",
    color: "text-blue-400",
  },
  HIGH: {
    value: "HIGH",
    label: "Alta (HIGH)",
    color: "text-amber-500",
  },
  CRITICAL: {
    value: "CRITICAL",
    label: "Crítica (CRITICAL)",
    color: "text-red-500 animate-pulse",
  },
};

/**
 * Roles de usuario permitidos para gestionar soporte
 */
export const SUPPORT_ROLES = ["ADMIN", "MANAGER", "SUPPORT"];

// Helper para transformar los objetos a arreglos listos para tus componentes <Select />
export const STATUS_OPTIONS = Object.values(TICKET_STATUSES);
export const PRIORITY_OPTIONS = Object.values(TICKET_PRIORITIES);
