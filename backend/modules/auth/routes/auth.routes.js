// ========================================
// routes/auth.routes.js
// ========================================
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../../../middleware/auth"); // Tu middleware de aduana/sesión

/* ======================================
 * 🔐 AUTHENTICATION
 * ==================================== */
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", auth, authController.logout);
router.post("/logout-all", auth, authController.logoutAll);

/* ======================================
 * 👤 CURRENT USER / PROFILE
 * ==================================== */
router.get("/me", auth, authController.getProfile);
router.put("/profile", auth, authController.updateProfile);
router.put("/change-password", auth, authController.changePassword);

// 🚀 NUEVA RUTA: Dar de baja la cuenta (Usa DELETE)
router.delete("/profile", auth, authController.deleteAccount);

/* ======================================
 * 🔑 PASSWORD RECOVERY
 * ==================================== */
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-reset-code", authController.verifyResetCode);
router.post("/reset-password", authController.resetPassword);

/* ======================================
 * 📱 TWO FACTOR AUTH (2FA)
 * ==================================== */
router.post("/2fa/setup", auth, authController.setupTwoFactor);
router.post("/2fa/enable", auth, authController.enableTwoFactor);
router.post("/2fa/disable", auth, authController.disableTwoFactor);
router.post("/2fa/verify", authController.verifyTwoFactor);

/* ======================================
 * 💻 SESSIONS
 * ==================================== */
router.get("/sessions", auth, authController.getSessions);
router.delete("/sessions/:sessionId", auth, authController.revokeSession);

/* ======================================
 * 📈 ACCOUNT STATUS
 * ==================================== */
router.get("/verify-token", auth, authController.verifyToken);
router.get("/status", auth, authController.getAccountStatus);

module.exports = router;