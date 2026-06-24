// ========================================
// routes/sale-detail.routes.js
// ========================================

const express = require("express");
const router = express.Router();

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
// MIDDLEWARES & VALIDATORS
// ========================================
const authMiddleware = require("../../../middleware/auth");

// 🚀 Importamos el nuevo validador de queries Joi para interceptar paginación y filtros
const {
    validateSaleDetailQuery,
    validateSaleDetailId,
    validateSaleId,
    validateProductId
} = require("../validations/saleDetail.validation");

// ========================================
// ROUTES
// ========================================

// ========================================
// GET ALL SALE DETAILS
// 🔍 Soporta: ?page=1&limit=10&search=SKU123&itemType=PRODUCT&companyId=5
// ========================================
router.get(
    "/",
    authMiddleware,
    validateSaleDetailQuery, // 🛡️ Intercepta y sanitiza los query params antes del controlador
    getSaleDetailsController
);

// ========================================
// GET DETAILS BY SALE
// ========================================
router.get(
    "/sale/:saleId",
    authMiddleware,
    validateSaleId, // Permite asegurar la integridad del parámetro de URL
    getSaleDetailsBySaleController
);

// ========================================
// GET DETAILS BY PRODUCT
// ========================================
router.get(
    "/product/:productId",
    authMiddleware,
    validateProductId, // Permite asegurar la integridad del parámetro de URL
    getSaleDetailsByProductController
);

// ========================================
// GET SALE DETAIL INDIVIDUAL
// 🔒 Mantenida al final para evitar falsos positivos con rutas fijas
// ========================================
router.get(
    "/:id",
    authMiddleware,
    validateSaleDetailId, // Asegura que el parámetro ':id' sea un entero positivo
    getSaleDetailController
);

module.exports = router;