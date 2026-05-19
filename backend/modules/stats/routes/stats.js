const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller =
  require("../controllers/stats.controller");

router.get(
  "/general",
  auth,
  controller.generalStats
);

router.get(
  "/inventory",
  auth,
  controller.inventoryStats
);

router.get(
  "/sales",
  auth,
  controller.salesStats
);

router.get(
  "/purchases",
  auth,
  controller.purchaseStats
);

module.exports = router;
