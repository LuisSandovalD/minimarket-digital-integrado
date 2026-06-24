// ========================================
// controllers/auth.controller.js
// ========================================

const loginCtrl = require("./login.controller");
const registerCtrl = require("./register.controller");
const profileCtrl = require("./profile.controller");
const sessionCtrl = require("./session.controller");
const passwordCtrl = require("./password.controller");
const twoFactorCtrl = require("./twofactor.controller");

module.exports = {
  /* ======================================
   * AUTHENTICATION & TOKENS
   * ==================================== */
  login: loginCtrl.login,
  register: registerCtrl.register,
  refreshToken: loginCtrl.refreshToken,
  verifyToken: loginCtrl.verifyToken,

  /* ======================================
   * CURRENT USER / PROFILE (Sincronizado con profile.controller)
   * ==================================== */
  getProfile: profileCtrl.getProfile,          // Mapeado exacto al estándar de servicios
  updateProfile: profileCtrl.updateProfile,
  getAccountStatus: profileCtrl.getAccountStatus, // Mapeado exacto al estándar de servicios
  deleteAccount: profileCtrl.deleteAccount,

  /* ======================================
   * PASSWORD RECOVERY
   * ==================================== */
  changePassword: passwordCtrl.changePassword,
  forgotPassword: passwordCtrl.forgotPassword,
  verifyResetCode: passwordCtrl.verifyResetCode,
  resetPassword: passwordCtrl.resetPassword,

  /* ======================================
   * SESSIONS
   * ==================================== */
  logout: sessionCtrl.logout,
  logoutAll: sessionCtrl.logoutAll,
  getSessions: sessionCtrl.getSessions,
  revokeSession: sessionCtrl.revokeSession,

  /* ======================================
   * TWO FACTOR AUTH (2FA)
   * ==================================== */
  setupTwoFactor: twoFactorCtrl.setupTwoFactor,
  enableTwoFactor: twoFactorCtrl.enableTwoFactor,
  disableTwoFactor: twoFactorCtrl.disableTwoFactor,
  verifyTwoFactor: twoFactorCtrl.verifyTwoFactor,
};