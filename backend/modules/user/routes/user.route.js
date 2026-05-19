// ========================================
// routes/user.route.js
// ========================================

const router =
  require("express").Router();

const auth =
  require("../../../middleware/auth");

const roleCheck =
  require("../../../middleware/roleCheck");

const controller =
  require("../controllers/user.controller");

// ========================================
// GET HIERARCHY
// IMPORTANT:
// ALWAYS PLACE BEFORE "/:id"
// ========================================

router.get(
  "/hierarchy",
  auth,
  roleCheck(
    "ADMIN",
    "MANAGER"
  ),
  controller.getHierarchy
);

// ========================================
// GET ALL USERS
// ========================================

router.get(
  "/",
  auth,
  roleCheck(
    "ADMIN",
    "MANAGER"
  ),
  controller.getUsers
);

// ========================================
// GET USER BY ID
// IMPORTANT:
// MUST GO AFTER "/hierarchy"
// ========================================

router.get(
  "/:id",
  auth,
  roleCheck(
    "ADMIN",
    "MANAGER",
    "SUPERVISOR"
  ),
  controller.getUserById
);

// ========================================
// CREATE USER
// ========================================

router.post(
  "/",
  auth,
  roleCheck("ADMIN"),
  controller.createUser
);

// ========================================
// UPDATE USER
// ========================================

router.put(
  "/:id",
  auth,
  roleCheck("ADMIN"),
  controller.updateUser
);

// ========================================
// TOGGLE STATUS
// ========================================

router.patch(
  "/:id/status",
  auth,
  roleCheck("ADMIN"),
  controller.toggleUserStatus
);

// ========================================
// RESTORE USER
// ========================================

router.patch(
  "/restore/:id",
  auth,
  roleCheck("ADMIN"),
  controller.restoreUser
);

// ========================================
// DELETE USER
// ========================================

router.delete(
  "/:id",
  auth,
  roleCheck("ADMIN"),
  controller.deleteUser
);

module.exports = router;