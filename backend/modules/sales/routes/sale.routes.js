// ========================================
// routes/sale.routes.js
// ========================================

const express =
  require("express");

const router =
  express.Router();

// ========================================
// CONTROLLERS
// ========================================

const {

  getSalesController,

  getSaleController,

  createSaleController,

  cancelSaleController,

  getDailySalesController,

  getTopProductsController,
  downloadDailySalesPDFController,
  downloadDailySalesExcelController,
  downloadTopProductsPDFController,
  downloadTopProductsExcelController,

} = require("../controllers/sale.controller");

// ========================================
// VALIDATORS
// ========================================

const {

  validateCreateSale,

  validateCancelSale,

} = require("../validators/sale.validator");

// ========================================
// MIDDLEWARES
// ========================================

const authMiddleware =
  require("../../../middleware/auth");

// ========================================
// ROUTES
// ========================================

// ========================================
// GET SALES
// ========================================

router.get(
  "/",
  authMiddleware,
  getSalesController
);

// ========================================
// DAILY REPORT
// ========================================

router.get(
  "/reports/daily",
  authMiddleware,
  getDailySalesController
);

// DOWNLOAD: PDF
router.get(
  "/reports/daily/pdf",
  authMiddleware,
  downloadDailySalesPDFController
);

// DOWNLOAD: EXCEL
router.get(
  "/reports/daily/excel",
  authMiddleware,
  downloadDailySalesExcelController
);

// ========================================
// TOP PRODUCTS
// ========================================

router.get(
  "/reports/top-products",
  authMiddleware,
  getTopProductsController
);

// DOWNLOAD: TOP PRODUCTS PDF
router.get(
  "/reports/top-products/pdf",
  authMiddleware,
  downloadTopProductsPDFController
);

// DOWNLOAD: TOP PRODUCTS EXCEL
router.get(
  "/reports/top-products/excel",
  authMiddleware,
  downloadTopProductsExcelController
);

// ========================================
// GET SALE
// ========================================

router.get(
  "/:id",
  authMiddleware,
  getSaleController
);

// ========================================
// CREATE SALE
// ========================================

router.post(
  "/",
  authMiddleware,
  validateCreateSale,
  createSaleController
);

// ========================================
// CANCEL SALE
// ========================================

router.patch(
  "/:id/cancel",
  authMiddleware,
  validateCancelSale,
  cancelSaleController
);

module.exports =
  router;