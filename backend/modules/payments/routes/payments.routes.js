// ========================================
// routes/payments.routes.js
// ========================================

const express = require("express");
const router = express.Router();

// ========================================
// CONTROLLERS
// ========================================
// Nota: Aquí importamos TODO unificado (CRUD, Custom y Reportes)
const {
  getPaymentsController,
  getPaymentController,
  getPaymentsBySaleController,
  getPaymentsByPurchaseController,
  createPaymentController,
  updatePaymentController,
  deletePaymentController,
  downloadPaymentsPDFController,   // Traído automáticamente por ...report
  downloadPaymentsExcelController, // Traído automáticamente por ...report
} = require("../controllers/payments.controller");

// ========================================
// MIDDLEWARES
// ========================================
const authMiddleware = require("../../../middleware/auth");

// ========================================
// ROUTES
// ========================================

// REPORTS (Es buena práctica poner las rutas estáticas/específicas arriba para evitar conflictos con /:id)
router.get(
  "/reports/payments/pdf",
  authMiddleware,
  downloadPaymentsPDFController,
);

router.get(
  "/reports/payments/excel",
  authMiddleware,
  downloadPaymentsExcelController,
);

// GET ALL PAYMENTS
router.get(
  "/",
  authMiddleware,
  getPaymentsController,
);

// GET PAYMENTS BY SALE
router.get(
  "/sale/:saleId",
  authMiddleware,
  getPaymentsBySaleController,
);

// GET PAYMENTS BY PURCHASE
router.get(
  "/purchase/:purchaseId",
  authMiddleware,
  getPaymentsByPurchaseController,
);

// GET PAYMENT BY ID
router.get(
  "/:id",
  authMiddleware,
  getPaymentController,
);

// CREATE PAYMENT
router.post(
  "/",
  authMiddleware,
  createPaymentController,
);

// UPDATE PAYMENT
router.put(
  "/:id",
  authMiddleware,
  updatePaymentController,
);

// DELETE PAYMENT
router.delete(
  "/:id",
  authMiddleware,
  deletePaymentController,
);

module.exports = router;
