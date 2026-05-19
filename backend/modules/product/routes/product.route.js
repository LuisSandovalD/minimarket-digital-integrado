// ========================================
// routes/product.route.js
// ========================================

const router =
  require("express").Router();

const auth =
  require("../../../middleware/auth");

const roleCheck =
  require("../../../middleware/roleCheck");

const controller =
  require("../controllers/product.controller");

// ========================================
// CRUD
// ========================================

router.get(
  "/",
  auth,
  controller.getProducts
);

router.get(
  "/featured",
  auth,
  controller.getFeaturedProducts
);

router.get(
  "/expiring",
  auth,
  controller.getExpiringProducts
);

router.get(
  "/low-stock",
  auth,
  controller.getLowStockProducts
);

router.get(
  "/:id",
  auth,
  controller.getProductById
);

router.post(
  "/",
  auth,
  roleCheck(
    "ADMIN",
    "MANAGER"
  ),
  controller.createProduct
);

router.put(
  "/:id",
  auth,
  roleCheck(
    "ADMIN",
    "MANAGER"
  ),
  controller.updateProduct
);

router.delete(
  "/:id",
  auth,
  roleCheck(
    "ADMIN"
  ),
  controller.deleteProduct
);

router.patch(
  "/:id/restore",
  auth,
  roleCheck(
    "ADMIN"
  ),
  controller.restoreProduct
);

module.exports = router;