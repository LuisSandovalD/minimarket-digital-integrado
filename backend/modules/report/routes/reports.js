const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller =
  require("../controllers/report.controller");

router.get(
  "/sales",
  auth,
  controller.salesReport
);

router.get(
  "/purchases",
  auth,
  controller.purchaseReport
);

router.get(
  "/inventory",
  auth,
  controller.inventoryReport
);

router.get(
  "/profits",
  auth,
  controller.profitReport
);

module.exports = router;
