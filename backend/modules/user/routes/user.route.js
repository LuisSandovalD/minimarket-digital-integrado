const router = require("express").Router();

const auth = require("../../../middleware/auth");
const roleCheck = require("../../../middleware/roleCheck");

const controller = require("../controllers/user.controller");

router.get(
  "/hierarchy",
  auth,
  roleCheck("ADMIN", "MANAGER"),
  controller.getHierarchy,
);

router.get(
  "/",
  auth,
  roleCheck("ADMIN", "MANAGER"),
  controller.getUsers,
);

router.get(
  "/:id",
  auth,
  roleCheck("ADMIN", "MANAGER", "SUPERVISOR"),
  controller.getUserById,
);

router.post(
  "/",
  auth,
  roleCheck("ADMIN"),
  controller.createUser,
);

router.put(
  "/:id",
  auth,
  roleCheck("ADMIN"),
  controller.updateUser,
);

router.patch(
  "/:id/status",
  auth,
  roleCheck("ADMIN"),
  controller.toggleUserStatus,
);

router.patch(
  "/:id/restore",
  auth,
  roleCheck("ADMIN"),
  controller.restoreUser,
);

router.delete(
  "/:id",
  auth,
  roleCheck("ADMIN"),
  controller.deleteUser,
);

module.exports = router;
