const router = require("express").Router();

const auth = require("../../../middleware/auth");

const roleCheck = require("../../../middleware/roleCheck");

const controller = require("../controllers/unit.controller");

router.get(
  "/",
  auth,
  controller.getUnits
);

router.get(
  "/:id",
  auth,
  controller.getUnitById
);

router.post(
  "/",
  auth,
  roleCheck("ADMIN", "MANAGER"),
  controller.createUnit
);

router.put(
  "/:id",
  auth,
  roleCheck("ADMIN", "MANAGER"),
  controller.updateUnit
);

router.delete(
  "/:id",
  auth,
  roleCheck("ADMIN"),
  controller.deleteUnit
);

module.exports = router;