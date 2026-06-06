// ========================================
// routes/sale-detail.routes.js
// ========================================

const express =
    require("express");

const router =
    express.Router();

// ========================================
// CONTROLLERS
// ========================================

const {

    getSaleDetailsController,

    getSaleDetailController,

    getSaleDetailsBySaleController,

    getSaleDetailsByProductController,

} = require("../controllers/saleDetail.controller");

// ========================================
// MIDDLEWARES
// ========================================

const authMiddleware =
    require("../../../middleware/auth");

// ========================================
// ROUTES
// ========================================

// ========================================
// GET ALL SALE DETAILS
// ========================================

router.get(
    "/",
    authMiddleware,
    getSaleDetailsController
);

// ========================================
// GET DETAILS BY SALE
// ========================================

router.get(
    "/sale/:saleId",
    authMiddleware,
    getSaleDetailsBySaleController
);

// ========================================
// GET DETAILS BY PRODUCT
// ========================================

router.get(
    "/product/:productId",
    authMiddleware,
    getSaleDetailsByProductController
);

// ========================================
// GET SALE DETAIL
// ========================================

router.get(
    "/:id",
    authMiddleware,
    getSaleDetailController
);

module.exports =
    router;