// ========================================
// routes/product.route.js
// ========================================

const router =
  require("express").Router();

const auth =
  require("../../../middleware/auth");

const roleCheck =
  require("../../../middleware/roleCheck");

// 🔥 IMPORTAMOS TU NUEVO MIDDLEWARE DE CONTROL SAAS
const checkSubscription =
  require("../../../middleware/subscription.middleware");

const controller =
  require("../controllers/product.controller");

// ========================================
// CRUD PROTEGIDO POR SUSCRIPCIÓN
// ========================================

// 💡 Nota: Primero se autentica (auth) y de inmediato se verifica el pago (checkSubscription)
router.get(
  "/",
  auth,
  checkSubscription,
  controller.getProducts
);

router.get(
  "/featured",
  auth,
  checkSubscription,
  controller.getFeaturedProducts
);

router.get(
  "/expiring",
  auth,
  checkSubscription,
  controller.getExpiringProducts
);

router.get(
  "/low-stock",
  auth,
  checkSubscription,
  controller.getLowStockProducts
);

router.get(
  "/:id",
  auth,
  checkSubscription,
  controller.getProductById
);

router.post(
  "/",
  auth,
  checkSubscription, // Blinda la creación para que solo usen el ERP si pagaron
  roleCheck(
    "ADMIN",
    "MANAGER"
  ),
  controller.createProduct
);

router.put(
  "/:id",
  auth,
  checkSubscription,
  roleCheck(
    "ADMIN",
    "MANAGER"
  ),
  controller.updateProduct
);

router.delete(
  "/:id",
  auth,
  checkSubscription,
  roleCheck(
    "ADMIN"
  ),
  controller.deleteProduct
);

router.patch(
  "/:id/restore",
  auth,
  checkSubscription,
  roleCheck(
    "ADMIN"
  ),
  controller.restoreProduct
);

module.exports = router;