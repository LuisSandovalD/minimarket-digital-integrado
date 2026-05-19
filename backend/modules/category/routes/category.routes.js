// ========================================
// routes/category.routes.js
// ========================================

const router =
  require("express").Router();

const auth =
  require("../../../middleware/auth");

const roleCheck =
  require("../../../middleware/roleCheck");

const controller =
  require("../controllers/category.controller");

// ========================================
// GET
// ========================================

router.get(
  "/",
  auth,
  controller.getCategories
);

router.get(
  "/:id",
  auth,
  controller.getCategoryById
);

// ========================================
// CREATE
// ========================================

router.post(
  "/",
  auth,
  roleCheck(
    "ADMIN",
    "MANAGER"
  ),
  controller.createCategory
);

// ========================================
// UPDATE
// ========================================

router.put(
  "/:id",
  auth,
  roleCheck(
    "ADMIN",
    "MANAGER"
  ),
  controller.updateCategory
);

// ========================================
// DELETE
// ========================================

router.delete(
  "/:id",
  auth,
  roleCheck("ADMIN"),
  controller.deleteCategory
);

module.exports = router;