// ========================================
// routes/branch.route.js
// ========================================

const express =
  require("express");

const router =
  express.Router();

const controller =
  require("../controllers/branch.controller");

const authMiddleware =
  require("../../../middleware/auth");

// 🔥 IMPORTAMOS TU MIDDLEWARE DE SUSCRIPCIÓN SAAS
const checkSubscription =
  require("../../../middleware/subscription.middleware");

/* ======================================
 * MIDDLEWARES GLOBALES DEL ENTRANTE
 * ==================================== */

// 1. Primero verifica que el usuario haya iniciado sesión
router.use(
  authMiddleware
);

// 2. ⚡ SEGUNDO: ¡El interruptor de pago! 
// Si no está al día, nadie pasa a las rutas de abajo.
router.use(
  checkSubscription
);

/* ======================================
 * GET ALL BRANCHES
 * ==================================== */

router.get(
  "/",
  controller.getBranches
);

/* ======================================
 * GET BRANCH BY ID
 * ==================================== */

router.get(
  "/:id",
  controller.getBranchById
);

/* ======================================
 * CREATE BRANCH
 * ==================================== */

router.post(
  "/",
  controller.createBranch
);

/* ======================================
 * UPDATE BRANCH
 * ==================================== */

router.put(
  "/:id",
  controller.updateBranch
);

/* ======================================
 * DELETE BRANCH
 * ==================================== */

router.delete(
  "/:id",
  controller.deleteBranch
);

module.exports =
  router;