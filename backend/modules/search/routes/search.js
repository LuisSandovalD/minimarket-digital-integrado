const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller =
  require("../controllers/search.controller");

router.get(
  "/products",
  auth,
  controller.searchProducts
);

router.get(
  "/sales",
  auth,
  controller.searchSales
);

router.get(
  "/users",
  auth,
  controller.searchUsers
);

router.get(
  "/purchases",
  auth,
  controller.searchPurchases
);

module.exports = router;
