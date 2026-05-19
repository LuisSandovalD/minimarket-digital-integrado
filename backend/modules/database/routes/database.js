const router = require("express").Router();

const auth = require("../../../middleware/auth");

const roleCheck =
  require("../../../middleware/roleCheck");

const controller =
  require("../controllers/database.controller");

router.get(
  "/status",
  auth,
  roleCheck("ADMIN"),
  controller.databaseStatus
);

router.post(
  "/optimize",
  auth,
  roleCheck("ADMIN"),
  controller.optimizeDatabase
);

module.exports = router;
