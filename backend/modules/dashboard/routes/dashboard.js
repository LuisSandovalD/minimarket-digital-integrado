const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller = require("../controllers/dashboard.controller");

router.get(
  "/",
  auth,
  controller.getDashboard
);

router.get(
  "/sales-chart",
  auth,
  controller.getSalesChart
);

router.get(
  "/purchase-chart",
  auth,
  controller.getPurchaseChart
);

router.get(
  "/top-products",
  auth,
  controller.getTopSellingProducts
);

module.exports = router;
