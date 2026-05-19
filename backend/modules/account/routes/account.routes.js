// ========================================
// routes/account.routes.js
// ========================================

const router =
  require("express").Router();

const controller =
  require("../controllers/account.controller");

const auth =
  require("../../../middleware/auth");

/* ======================================
 * PROFILE
 * ==================================== */

router.get(
  "/profile",
  auth,
  controller.getMyAccount
);

router.put(
  "/profile",
  auth,
  controller.updateMyAccount
);

/* ======================================
 * PASSWORD
 * ==================================== */

router.put(
  "/password",
  auth,
  controller.updatePassword
);

/* ======================================
 * TWO FACTOR AUTH
 * ==================================== */

router.put(
  "/2fa",
  auth,
  controller.toggleTwoFactor
);

/* ======================================
 * ACTIVE SESSIONS
 * ==================================== */

router.get(
  "/sessions",
  auth,
  controller.getSessions
);

router.delete(
  "/sessions/:id",
  auth,
  controller.closeSession
);

/* ======================================
 * DELETE ACCOUNT
 * ==================================== */

router.delete(
  "/delete",
  auth,
  controller.deleteMyAccount
);

module.exports =
  router;