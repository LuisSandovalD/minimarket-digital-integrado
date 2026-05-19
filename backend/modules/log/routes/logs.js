const router = require("express").Router();

const auth = require("../../../middleware/auth");

const roleCheck =
  require("../../../middleware/roleCheck");

const controller =
  require("../controllers/log.controller");

router.get(
  "/",
  auth,
  roleCheck("ADMIN"),
  controller.getLogs
);

router.get(
  "/errors",
  auth,
  roleCheck("ADMIN"),
  controller.getErrors
);

module.exports = router;
