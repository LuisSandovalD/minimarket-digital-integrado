// ========================================
// routes/account.routes.js
// ========================================

const router =
  require("express").Router();

const controller =
  require("../controllers/account.controller");

const auth =
  require("../../../middleware/auth");

router.put(
  "/2fa",
  auth,
  controller.toggleTwoFactor
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