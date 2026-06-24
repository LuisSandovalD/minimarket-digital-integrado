// ========================================
// modules/audit/routes/audit.routes.js
// ========================================

const express = require("express");
const router = express.Router();
const auditController = require("../controllers/audit.controller");

// 1. Tu middleware de token intocable (el que ejecuta el AsyncLocalStorage)
const verifyToken = require("../../../middleware/auth");

// 2. Tu middleware de roles (Importado directamente sin llaves porque exporta una función)
const authorizeRoles = require("../../../middleware/roleCheck"); // 👈 Asegúrate de poner la ruta real a ese archivo que me pasaste

// Endpoint protegido: GET /api/audit
router.get(
    "/",
    verifyToken,          // 1º Autentica e inicia el almacenamiento aislado de auditoría
    authorizeRoles("ADMIN"), // 2º Ejecuta tu función de validación de roles de forma limpia
    auditController.getAuditLogs
);

module.exports = router;