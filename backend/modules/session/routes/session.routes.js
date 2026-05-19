const router =
  require("express").Router();

const auth =
  require("../../../middleware/auth");

const controller =
  require("../controllers/session.controller");

router.post(
  "/",
  auth,
  controller.create
);

module.exports =
  router;