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

// ========================================
// TOP PRODUCTS
// ========================================

router.get(
  "/reports/top-products",
  authMiddleware,
  getTopProductsController
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