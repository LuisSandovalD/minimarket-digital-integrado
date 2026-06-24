// ========================================
// features/account/constants/account.constants.js
// ========================================

/**
 * Etiquetas amigables para los roles del sistema.
 * Consumido directamente por el helper getRoleLabel().
 */
export const ROLE_LABELS = Object.freeze({
  ADMIN: "Administrador",
  MANAGER: "Gerente",
  SUPERVISOR: "Supervisor",
  EMPLOYEE: "Empleado",
  VIEWER: "Visualizador",
});

/**
 * Identificadores únicos para las pestañas de navegación
 * dentro del panel de configuración de la cuenta.
 */
export const ACCOUNT_TABS = Object.freeze([
  "profile", // Datos personales e información de empresa/sucursal
  "security", // Cambio de contraseña y flujo modular de 2FA
  "sessions", // Monitor de dispositivos activos e IP de auditoría
  "preferences", // Configuración local (ej. Tema oscuro/claro, idioma)
  "danger", // Zona crítica de baja (Eliminación de cuenta con contraseña)
]);
