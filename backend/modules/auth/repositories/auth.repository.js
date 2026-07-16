// ========================================
// repositories/auth.repository.js
// ========================================

// Sub-repositorios de Usuarios (Separados por dominio)
const userRepository = require("./user.repository");
const userAuthRepository = require("./user-auth.repository");
const userCryptoRepository = require("./user-crypto.repository");
const user2FARepository = require("./user-2fa.repository");

// Otros repositorios del sistema
const companyRepository = require("./company.repository");
const branchRepository = require("./branch.repository");
const sessionRepository = require("./session.repository");
const auditRepository = require("./audit.repository");

const { registerTenant } = require("./register.repository");

module.exports = {

  /* ======================================
   * USER REPOSITORY METHODS (CRUD & INFO)
   * ==================================== */
  findUserByEmail: userRepository.findUserByEmail,
  findUserById: userRepository.findUserById,
  createUser: userRepository.createUser,
  updateUser: userRepository.updateUser,

  /* ======================================
   * USER AUTH METHODS (SEGURIDAD & LOGIN)
   * ==================================== */
  updatePassword: userAuthRepository.updatePassword,
  incrementLoginAttempts: userAuthRepository.incrementLoginAttempts,
  resetLoginAttempts: userAuthRepository.resetLoginAttempts,
  lockUser: userAuthRepository.lockUser,

  /* ======================================
   * USER CRYPTO METHODS (RECUPERACIÓN / RESET)
   * ==================================== */
  savePasswordResetCode: userCryptoRepository.savePasswordResetCode,
  findResetCode: userCryptoRepository.findResetCode,
  markResetCodeAsUsed: userCryptoRepository.markResetCodeAsUsed,

  /* ======================================
   * USER 2FA METHODS (VERIFICACIÓN DOBLE FACTOR)
   * ==================================== */
  saveTwoFactorCode: user2FARepository.saveTwoFactorCode,
  findValidTwoFactorCode: user2FARepository.findValidTwoFactorCode,
  clearTwoFactorCode: user2FARepository.clearTwoFactorCode,
  enableTwoFactorAuth: user2FARepository.enableTwoFactorAuth,
  disableTwoFactorAuth: user2FARepository.disableTwoFactorAuth,

  /* ======================================
   * COMPANY REPOSITORY METHODS
   * ==================================== */
  findCompanyByName: companyRepository.findCompanyByName,
  findCompanyBySlug: companyRepository.findCompanyBySlug,
  findCompanyByRuc: companyRepository.findCompanyByRuc,
  createCompany: companyRepository.createCompany,

  /* ======================================
   * BRANCH REPOSITORY METHODS
   * ==================================== */
  createBranch: branchRepository.createBranch,

  /* ======================================
   * SESSION REPOSITORY METHODS
   * ==================================== */
  createSession: sessionRepository.createSession,
  findSessionByToken: sessionRepository.findSessionByToken,
  findSessionById: sessionRepository.findSessionById,
  findAllActiveSessions: sessionRepository.findAllActiveSessions,
  deactivateSessionByToken: sessionRepository.deactivateSessionByToken,
  deactivateSessionById: sessionRepository.deactivateSessionById,
  deactivateAllSessions: sessionRepository.deactivateAllSessions,
  updateSessionToken: sessionRepository.updateSessionToken,

  /* ======================================
   * AUDIT REPOSITORY METHODS
   * ==================================== */
  createAuditLog: auditRepository.createAuditLog,

  /* ======================================
   * REGISTER MULTI-TENANT
   * ==================================== */
  registerTenant,
};
