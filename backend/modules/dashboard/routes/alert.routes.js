const express = require("express");
const router = express.Router();

const alertController = require("../controllers/alert.controller");

const auth = require("../../../middleware/auth");
const checkRole = require("../../../middleware/roleCheck");

router.get(
    "/",
    auth,
    checkRole("ADMIN", "MANAGER", "SUPERVISOR"),
    alertController.getAlerts
);

router.get(
    "/low-stock",
    auth,
    checkRole("ADMIN", "MANAGER", "SUPERVISOR"),
    alertController.getAlerts
);

router.get(
    "/expiring-products",
    auth,
    checkRole("ADMIN", "MANAGER", "SUPERVISOR"),
    alertController.getAlerts
);

router.get(
    "/notifications",
    auth,
    checkRole("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE"),
    alertController.getAlerts
);

module.exports = router;