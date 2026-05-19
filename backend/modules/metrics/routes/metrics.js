const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller =
  require("../controllers/metrics.controller");

router.get(
  "/kpis",
  auth,
  controller.getKPIs
);

router.get(
  "/growth",
  auth,
  controller.getGrowthMetrics
);

router.get(
  "/comparison",
  auth,
  controller.compareMetrics
);

module.exports = router;
