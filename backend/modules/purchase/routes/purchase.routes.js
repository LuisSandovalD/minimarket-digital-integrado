// ========================================
// routes/purchase.routes.js
// ========================================

const router =
  require("express").Router();

const auth =
  require("../../../middleware/auth");

// ========================================
// CONTROLLERS (SEPARADOS)
// ========================================
const createPurchaseController =
  require("../controllers/create-purchase.controller").createPurchaseController;

const getPurchasesController =
  require("../controllers/get-purchases.controller").getPurchasesController;

const getPurchaseByIdController =
  require("../controllers/get-purchase-by-id.controller").getPurchaseByIdController;

const updatePurchaseStatusController =
  require("../controllers/update-purchase-status.controller").updatePurchaseStatusController;

const cancelPurchaseController =
  require("../controllers/cancel-purchase.controller").cancelPurchaseController;
const {
  downloadDailyPurchasesPDFController,
  downloadDailyPurchasesExcelController,
} = require("../controllers/report-purchase.controller");

// ========================================
// ROUTES
// ========================================

router.post(
  "/",
  auth,
  createPurchaseController,
);

router.get(
  "/",
  auth,
  getPurchasesController,
);

router.get(
  "/:id",
  auth,
  getPurchaseByIdController,
);

router.patch(
  "/:id/status",
  auth,
  updatePurchaseStatusController,
);

router.patch(
  "/:id/cancel",
  auth,
  cancelPurchaseController,
);

// REPORTS
router.get(
  "/reports/daily/pdf",
  auth,
  downloadDailyPurchasesPDFController,
);

router.get(
  "/reports/daily/excel",
  auth,
  downloadDailyPurchasesExcelController,
);

module.exports = router;
