// ========================================
// routes/auth.routes.js
// ========================================

const router =
  require("express").Router();

const controller =
  require("../controllers/auth.controller");

const auth =
  require("../../../middleware/auth");

/* ======================================
 * LOGIN
 * ==================================== */

router.post(
  "/login",
  controller.login
);

/* ======================================
 * REGISTER
 * ==================================== */

router.post(
  "/register",
  controller.register
);

/* ======================================
 * ME
 * ==================================== */

router.get(

  "/me",

  auth,

  controller.me

);

/* ======================================
 * LOGOUT
 * ==================================== */

router.post(

  "/logout",

  auth,

  controller.logout

);

module.exports =
  router;