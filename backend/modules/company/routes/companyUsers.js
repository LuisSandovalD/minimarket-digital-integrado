const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller =
  require("../controllers/company.controller");

router.get(
  "/",
  auth,
  controller.getCompanyUsers
);

router.get(
  "/admins",
  auth,
  controller.getAdmins
);

router.get(
  "/employees",
  auth,
  controller.getEmployees
);

module.exports = router;
