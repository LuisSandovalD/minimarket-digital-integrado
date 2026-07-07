const router = require("express").Router();

const auth = require("../../../middleware/auth");
const roleCheck = require("../../../middleware/roleCheck");

const controller = require("../controllers/unit.controller");

const {
    validateUnitQuery
} = require("../validators/unit-query.validator");

const {
    validateCreateUnit
} = require("../validators/unit-create.validator");

const {
    validateUpdateUnit
} = require("../validators/unit-update.validator");

router.get("/", auth, roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"), validateUnitQuery, controller.getUnits);

router.get("/:id", auth, roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"), controller.getUnitById);

router.post("/", auth, roleCheck("ADMIN", "MANAGER", "SUPPORT"), validateCreateUnit, controller.createUnit);

router.put("/:id", auth, roleCheck("ADMIN", "MANAGER", "SUPPORT"), validateUpdateUnit, controller.updateUnit);

router.delete("/:id", auth, roleCheck("ADMIN"), controller.deleteUnit);

module.exports = router;