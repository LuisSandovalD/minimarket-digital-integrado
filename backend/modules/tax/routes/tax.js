const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller =
  require("../controllers/tax.controller");

router.get(
  "/summary",
  auth,
  controller.taxSummary
);

router.get(
  "/sales",
  auth,
  controller.salesTaxes
);

router.get(
  "/purchases",
  auth,
  controller.purchaseTaxes
);

module.exports = router;
