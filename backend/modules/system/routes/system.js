const router = require("express").Router();

const auth = require("../../../middleware/auth");

const roleCheck =
  require("../../../middleware/roleCheck");

const controller =
  require("../controllers/system.controller");

router.get(
  "/info",
  auth,
  roleCheck("ADMIN"),
  controller.getSystemInfo
);

router.get(
  "/logs",
  auth,
  roleCheck("ADMIN"),
  controller.getSystemLogs
);

router.post(
  "/clear-cache",
  auth,
  roleCheck("ADMIN"),
  controller.clearCache
);

module.exports = router;
