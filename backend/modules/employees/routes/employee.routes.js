// ========================================
// modules/employees/routes/employee.routes.js
// ========================================

const router =
  require("express").Router();

const controller =
  require("../controllers/employee.controller");

const auth =
  require("../../../middleware/auth");

// ========================================
// ROUTES
// ========================================

router.get(
  "/",
  auth,
  controller.getEmployees
);

router.post(
  "/",
  auth,
  controller.createEmployee
);

router.put(
  "/:id",
  auth,
  controller.updateEmployee
);

router.delete(
  "/:id",
  auth,
  controller.deleteEmployee
);

module.exports =
  router;