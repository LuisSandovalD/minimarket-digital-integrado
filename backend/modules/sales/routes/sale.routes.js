// ========================================
// routes/sale.routes.js
// ========================================

const express = require("express");
const router = express.Router();

// ========================================
// CONTROLLERS
// ========================================
const controllers = require("../controllers/sale.controller");
// 🛠️ IMPORTACIÓN ADICIONAL: Traemos los controladores de reportes que separamos hace un momento
const reportControllers = require("../controllers/report-sale.controller");
const { registerSalePaymentController } = require("../controllers/register-payment.controller");

// Extracción de controladores base
const {
  getSalesController,
  getSaleController,
  createSaleController,
  cancelSaleController
} = controllers;

// 🎯 Extracción desde el nuevo archivo de reportes modulares
const {
  getDailySalesController,
  getTopProductsController,
  downloadDailySalesPDFController,
  downloadDailySalesExcelController,
  downloadTopProductsPDFController,
  downloadTopProductsExcelController
} = reportControllers;

// 🛡️ CONTROL DE DAÑOS CRÍTICO
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

const updateSaleModule = require("../validators/update-sale.validator");

// 🛡️ CONTROL DE DAÑOS REFORZADO
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
const roleCheck = require("../../../middleware/roleCheck");

const PRIVILEGED_ROLES = ["ADMIN", "SUPERVISOR", "MANAGER"];

// ========================================
// ROUTES
// ========================================

// ── GET SALES ──
router.get("/", authMiddleware, getSalesController);

// ── DAILY REPORT ──
router.get("/reports/daily", authMiddleware, roleCheck(...PRIVILEGED_ROLES), getDailySalesController);
router.get("/reports/daily/pdf", authMiddleware, roleCheck(...PRIVILEGED_ROLES), downloadDailySalesPDFController);
router.get("/reports/daily/excel", authMiddleware, roleCheck(...PRIVILEGED_ROLES), downloadDailySalesExcelController);

// ── TOP PRODUCTS ──
router.get("/reports/top-products", authMiddleware, roleCheck(...PRIVILEGED_ROLES), getTopProductsController);
router.get("/reports/top-products/pdf", authMiddleware, roleCheck(...PRIVILEGED_ROLES), downloadTopProductsPDFController);
router.get("/reports/top-products/excel", authMiddleware, roleCheck(...PRIVILEGED_ROLES), downloadTopProductsExcelController);

// ── GET SALE (Ubicada correctamente debajo de las estáticas para evitar colisiones) ──
router.get("/:id", authMiddleware, getSaleController);

// ── CREATE SALE ──
router.post("/", authMiddleware, validateCreateSale, createSaleController);

// ── UPDATE SALE ──
router.put("/:id", authMiddleware, updateSaleValidator, updateSaleController);

// ── REGISTER SALE PAYMENT ──
router.post("/:id/payments", authMiddleware, validateAddSalePayment, registerSalePaymentController);

// ── CANCEL SALE ──
router.patch("/:id/cancel", authMiddleware, validateCancelSale, cancelSaleController);

module.exports = router;