// ========================================
// routes/inventory.routes.js
// ========================================

const express = require("express");
const router = express.Router();

// 📂 IMPORTAMOS AMBOS CONTROLADORES
const inventoryController = require("../controllers/inventory.controller"); // El general (trae consultas y transferencias)
const stockController = require("../controllers/inventory-stock.controller"); // El nuevo (trae addStock, removeStock, reserve, release y damaged)
const reportInventory = require("../controllers/report-inventory.controller");

// MIDDLEWARES
const auth = require("../../../middleware/auth");
const validate = require("../../../middleware/validate.middleware");

// VALIDATORS
const {
  addStockSchema,
  removeStockSchema,
  reserveStockSchema,
  damagedStockSchema,
  historyRangeSchema,
  transferStockSchema,
} = require("../validators/inventory.validator");

// ========================================
// INVENTORY (Consultas generales)
// ========================================
router.get("/", auth, inventoryController.getInventories);
router.get("/:id", auth, inventoryController.getInventoryById);
router.get("/low-stock", auth, inventoryController.getLowStock);
router.get("/damaged", auth, inventoryController.getDamagedStock);

// ========================================
// STOCK (Mutaciones críticas - Al nuevo controlador blindado)
// ========================================
router.patch("/:id/add-stock", auth, validate(addStockSchema), stockController.addStock);

// 🚨 TU RUTA CRÍTICA BLINDADA
router.patch("/:id/remove-stock", auth, validate(removeStockSchema), stockController.removeStock);

router.patch("/:id/reserve", auth, validate(reserveStockSchema), stockController.reserveStock);
router.patch("/:id/release", auth, validate(reserveStockSchema), stockController.releaseReservedStock);
router.patch("/:id/damaged", auth, validate(damagedStockSchema), stockController.addDamagedStock);

// ========================================
// MOVEMENTS & HISTORY (Consultas)
// ========================================
router.get("/movements/all", auth, inventoryController.getMovements);
router.get("/movements/product/:productId", auth, inventoryController.getProductMovements);
router.get("/movements/branch/:branchId", auth, inventoryController.getBranchMovements);
router.get("/history/:inventoryId", auth, inventoryController.getHistoryByInventory);
router.get("/history", auth, validate(historyRangeSchema, "query"), inventoryController.getHistoryByDateRange);
router.get("/metrics", auth, inventoryController.getInventoryMetrics);

// REPORTS: PDF / EXCEL
router.get("/reports/inventory/pdf", auth, reportInventory.downloadInventoryPDFController);
router.get("/reports/inventory/excel", auth, reportInventory.downloadInventoryExcelController);

// ========================================
// TRANSFERS
// ========================================
// 🔥 SOLUCIÓN: Cambiado a inventoryController porque ahí reside tu lógica original de transferencias
router.post("/transfer", auth, validate(transferStockSchema), inventoryController.transferStock);

module.exports = router;