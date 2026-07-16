// ========================================
// modules/notification/routes/notifications.routes.js
// ========================================

const router = require("express").Router();
const auth = require("../../../middleware/auth");
const roleCheck = require("../../../middleware/roleCheck");
const { NotificationController } = require("../controllers/notification.controller");

const controller = new NotificationController();

// ========================================
// GET /api/v1/notifications
// ========================================
router.get(
  "/",
  auth,
  roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE"),
  controller.getAll.bind(controller),
);

module.exports = router;
