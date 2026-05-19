const router = require("express").Router();

const auth = require("../../../middleware/auth");

const roleCheck = require("../../../middleware/roleCheck");

const controller = require("../controllers/import.controller");

router.post(
  "/products",
  auth,
  roleCheck("ADMIN"),
  controller.importProducts
);

router.post(
  "/categories",
  auth,
  roleCheck("ADMIN"),
  controller.importCategories
);

module.exports = router;
