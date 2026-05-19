// ========================================
// modules/notification/routes/notification.routes.js
// ========================================

const router =
  require("express").Router();

const auth =
  require("../../../middleware/auth");

const roleCheck =
  require("../../../middleware/roleCheck");

const {
  NotificationController,
} = require(
  "../controllers/notification.controller"
);

const controller =
  new NotificationController();

// ========================================
// GET NOTIFICATIONS
// ========================================

router.get(
  "/",
  auth,
  roleCheck(
    "ADMIN",
    "MANAGER",
    "SUPERVISOR",
    "EMPLOYEE"
  ),
  controller.getAll.bind(controller)
);

module.exports = router;