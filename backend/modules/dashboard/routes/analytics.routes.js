const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

const auth = require("../../../middleware/auth");
const checkRole = require("../../../middleware/roleCheck");

const ADMIN_MANAGER = checkRole("ADMIN", "MANAGER");

router.get("/", auth, ADMIN_MANAGER, analyticsController.getAnalytics);

router.get("/sales", auth, ADMIN_MANAGER, analyticsController.getAnalytics);

router.get("/top-products", auth, ADMIN_MANAGER, analyticsController.getAnalytics);

router.get("/top-customers", auth, ADMIN_MANAGER, analyticsController.getAnalytics);

router.get("/purchases", auth, ADMIN_MANAGER, analyticsController.getAnalytics);

router.get("/top-suppliers", auth, ADMIN_MANAGER, analyticsController.getAnalytics);

module.exports = router;