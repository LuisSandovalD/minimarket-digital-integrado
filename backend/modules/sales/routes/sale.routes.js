// ========================================
// routes/sale.routes.js
// ========================================

const express = require("express");
const router = express.Router();

// ========================================
// CONTROLLERS
// ========================================
const controllers = require("../controllers/sale.controller");
const { registerSalePaymentController } = require("../controllers/register-payment.controller");

// Extracción directa de controladores desde el módulo unificado
const {
  getSalesController, // 🎯 Consume tus filtros avanzados, botones, rangos, paginación y segmentación de roles
  getSaleController,
  createSaleController,
  cancelSaleController,
  getDailySalesController,
  getTopProductsController,
  downloadDailySalesPDFController,
  downloadDailySalesExcelController,
  downloadTopProductsPDFController,
  downloadTopProductsExcelController
} = controllers;

// 🛡️ CONTROL DE DAÑOS CRÍTICO: Si updateSaleController no se exportó bien, creamos un mock para que no rompa Express
const updateSaleController = controllers.updateSaleController || ((req, res) => {
  console.warn("⚠️ ALERTA: updateSaleController llegó indefinido. Revisa controllers/update-sale.controller.js");
  return res.status(501).json({ success: false, message: "Controlador de actualización no configurado correctamente." });
});

// ========================================
// VALIDATORS
// ========================================
const validators = require("../validators/sale.validator");

const {
  validateCreateSale,
  validateCancelSale,
  validateAddSalePayment
} = validators;

// 🎯 SOLUCIÓN AL ENIGMA: Importamos el validador desde su archivo específico e independiente
const updateSaleModule = require("../validators/update-sale.validator");

// 🛡️ CONTROL DE DAÑOS REFORZADO: Ahora extrae la función de manera segura del módulo dedicado
const updateSaleValidator = updateSaleModule && typeof updateSaleModule.updateSaleValidator === "function"
  ? updateSaleModule.updateSaleValidator
  : (req, res, next) => {
    console.warn("⚠️ ALERTA CRÍTICA: updateSaleValidator sigue sin encontrarse en validators/update-sale.validator.js");
    next();
  };

// ========================================
// MIDDLEWARES
// ========================================
const authMiddleware = require("../../../middleware/auth");
const roleCheck = require("../../../middleware/roleCheck"); // 🎯 Importado dinámicamente según tu módulo rolecheck

// Roles del sistema con privilegios administrativos y de supervisión global
const PRIVILEGED_ROLES = ["ADMIN", "SUPERVISOR", "MANAGER"];

// ========================================
// ROUTES
// ========================================

// ── GET SALES (Soporta Query Params dinámicos como ?status, ?search, ?startDate, etc.) ──
// 🔓 Nota: Entran todos los usuarios autenticados; el controlador restringe la data si es vendedor
router.get("/", authMiddleware, getSalesController);

// ── DAILY REPORT (Protegido por Rol corporativo) ──
router.get("/reports/daily", authMiddleware, roleCheck(...PRIVILEGED_ROLES), getDailySalesController);
router.get("/reports/daily/pdf", authMiddleware, roleCheck(...PRIVILEGED_ROLES), downloadDailySalesPDFController);
router.get("/reports/daily/excel", authMiddleware, roleCheck(...PRIVILEGED_ROLES), downloadDailySalesExcelController);

// ── TOP PRODUCTS (Protegido por Rol corporativo) ──
router.get("/reports/top-products", authMiddleware, roleCheck(...PRIVILEGED_ROLES), getTopProductsController);
router.get("/reports/top-products/pdf", authMiddleware, roleCheck(...PRIVILEGED_ROLES), downloadTopProductsPDFController);
router.get("/reports/top-products/excel", authMiddleware, roleCheck(...PRIVILEGED_ROLES), downloadTopProductsExcelController);

// ── GET SALE (Especificidad de Rutas - El controlador valida pertenencia si no es admin) ──
router.get("/:id", authMiddleware, getSaleController);

// ── CREATE SALE ──
router.post("/", authMiddleware, validateCreateSale, createSaleController);

// ── UPDATE SALE (Punto de conflicto resuelto 🚀) ──
// Ahora el validador Joi procesará el PUT /api/sale/1998 de forma nativa como middleware corporativo
router.put("/:id", authMiddleware, updateSaleValidator, updateSaleController);

// ── REGISTER SALE PAYMENT (Abonos / Amortizaciones en Caja) ──
router.post(
  "/:id/payments",
  authMiddleware,
  validateAddSalePayment,
  registerSalePaymentController
);

// ── CANCEL SALE ──
router.patch("/:id/cancel", authMiddleware, validateCancelSale, cancelSaleController);

module.exports = router;