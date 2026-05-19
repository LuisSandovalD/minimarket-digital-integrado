const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller =
  require("../controllers/profit.controller");

router.get(
  "/daily",
  auth,
  controller.dailyProfit
);

router.get(
  "/monthly",
  auth,
  controller.monthlyProfit
);

router.get(
  "/yearly",
  auth,
  controller.yearlyProfit
);

module.exports = router;
