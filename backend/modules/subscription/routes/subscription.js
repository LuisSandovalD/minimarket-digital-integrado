const router = require("express").Router();

const auth = require("../../../middleware/auth");

const roleCheck = require("../../../middleware/roleCheck");

const controller = require("../controllers/subscription.controller");

router.get(
  "/",
  auth,
  controller.getSubscription
);

router.put(
  "/",
  auth,
  roleCheck("ADMIN"),
  controller.updateSubscription
);

module.exports = router;
