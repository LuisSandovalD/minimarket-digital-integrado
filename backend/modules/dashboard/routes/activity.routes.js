const express = require("express");
const router = express.Router();

const activityController = require("../controllers/activity.controller");

const auth = require("../../../middleware/auth");
const checkRole = require("../../../middleware/roleCheck");

router.get(
  "/",
  auth,
  checkRole("ADMIN", "MANAGER"),
  activityController.getActivity,
);

router.get(
  "/recent",
  auth,
  checkRole("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE"),
  activityController.getActivity,
);

module.exports = router;
