// ========================================
// routes/payments.routes.js
// ========================================

const express =
    require("express");

const router =
    express.Router();

// ========================================
// CONTROLLERS
// ========================================

const {

    getPaymentsController,

    getPaymentController,

    getPaymentsBySaleController,

    getPaymentsByPurchaseController,

    createPaymentController,

    updatePaymentController,

    deletePaymentController,

} = require("../controllers/payments.controller");
const reportPayments = require('../controllers/report-payments.controller')

// ========================================
// MIDDLEWARES
// ========================================

const authMiddleware =
    require("../../../middleware/auth");

// ========================================
// ROUTES
// ========================================

// ========================================
// GET ALL PAYMENTS
// ========================================

router.get(
    "/",
    authMiddleware,
    getPaymentsController
);

// ========================================
// GET PAYMENTS BY SALE
// ========================================

router.get(
    "/sale/:saleId",
    authMiddleware,
    getPaymentsBySaleController
);

// ========================================
// GET PAYMENTS BY PURCHASE
// ========================================

router.get(
    "/purchase/:purchaseId",
    authMiddleware,
    getPaymentsByPurchaseController
);

// ========================================
// GET PAYMENT
// ========================================

router.get(
    "/:id",
    authMiddleware,
    getPaymentController
);

// ========================================
// CREATE PAYMENT
// ========================================

router.post(
    "/",
    authMiddleware,
    createPaymentController
);

// ========================================
// UPDATE PAYMENT
// ========================================

router.put(
    "/:id",
    authMiddleware,
    updatePaymentController
);

// ========================================
// DELETE PAYMENT
// ========================================

router.delete(
    "/:id",
    authMiddleware,
    deletePaymentController
);

// REPORTS
// REPORTS
router.get('/reports/payments/pdf', authMiddleware, reportPayments.downloadPaymentsPDFController);
router.get('/reports/payments/excel', authMiddleware, reportPayments.downloadPaymentsExcelController);

module.exports =
    router;