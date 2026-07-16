// ========================================
// routes/auth.routes.js
// ========================================
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../../../middleware/auth"); // Tu middleware de aduana/sesión

// 🌟 PATRÓN CLONADO: CONFIGURACIÓN DE MULTER EN MEMORIA PARA EL AVATAR
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

// 🌟 INTERCEPTAMOS EL AVATAR COMO UN ARCHIVO BINARIO REAL (Igual que con el logo)
router.put("/profile", auth, upload.single("avatar"), authController.updateProfile);

router.put("/change-password", auth, authController.changePassword);
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
