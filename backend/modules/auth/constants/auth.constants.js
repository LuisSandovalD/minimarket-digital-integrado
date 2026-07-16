// ========================================
// modules/auth/constants/auth.constants.js
// ========================================

module.exports = {
  // PLAN B: Si process.env falla o está vacío, el operador || inyecta un string de respaldo automático
  JWT_SECRET: process.env.JWT_SECRET || "SUPER_SECRET_KEY",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "SUPER_SECRET_KEY_REFRESH",

  // Tiempos de expiración estándar
  JWT_EXPIRES: process.env.JWT_EXPIRES || "15m",
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",

  // Políticas de seguridad de accesos
  MAX_LOGIN_ATTEMPTS: 5,
  ACCOUNT_LOCK_MINUTES: 15,
};
