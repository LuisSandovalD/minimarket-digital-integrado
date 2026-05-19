const router = require("express").Router();

const auth = require("../../../middleware/auth");

const roleCheck =
  require("../../../middleware/roleCheck");

const controller =
  require("../controllers/cron.controller");

router.post(
  "/run-low-stock",
  auth,
  roleCheck("ADMIN"),
  controller.runLowStockCheck
);

router.post(
  "/run-expiring",
  auth,
  roleCheck("ADMIN"),
  controller.runExpiringCheck
);

router.post(
  "/run-overdue-payments",
  auth,
  roleCheck("ADMIN"),
  controller.runOverduePayments
);

module.exports = router;
