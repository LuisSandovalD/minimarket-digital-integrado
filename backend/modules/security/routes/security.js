const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller =
  require("../controllers/security.controller");

router.get(
  "/sessions",
  auth,
  controller.getSessions
);

router.post(
  "/logout-all",
  auth,
  controller.logoutAllDevices
);

router.post(
  "/change-password",
  auth,
  controller.changePassword
);

module.exports = router;
