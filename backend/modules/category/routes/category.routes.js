// ========================================
// routes/category.routes.js
// ========================================

const router =
  require("express").Router();

const auth =
  require("../../../middleware/auth");

const roleCheck =
  require("../../../middleware/roleCheck");

// 🔥 IMPORTAMOS TU MIDDLEWARE DE SUSCRIPCIÓN SAAS
const checkSubscription =
  require("../../../middleware/subscription.middleware");

const controller =
  require("../controllers/category.controller");

// ========================================
// GET (PROTEGIDO POR SUSCRIPCIÓN)
// ========================================

router.get(
  "/",
  auth,
  checkSubscription, // Bloquea si no está al día
  controller.getCategories
);

router.get(
  "/:id",
  auth,
  checkSubscription,
  controller.getCategoryById
);

// ========================================
// CREATE
// ========================================

router.post(
  "/",
  auth,
  checkSubscription,
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
  checkSubscription,
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
  checkSubscription,
  roleCheck("ADMIN"),
  controller.deleteCategory
);

module.exports = router;