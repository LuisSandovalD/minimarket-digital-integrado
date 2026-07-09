const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");
const kpiController = require("../controllers/kpi.controller");
const reportActivity = require("../controllers/report-activity.controller");

const auth = require("../../../middleware/auth");
const checkRole = require("../../../middleware/roleCheck");

const ADMIN_MANAGER = checkRole("ADMIN", "MANAGER");

router.get("/", auth, dashboardController.getDashboard);

router.get("/kpis", auth, checkRole("ADMIN", "MANAGER", "SUPERVISOR"), kpiController.getKPIs);

router.get("/reports/activity/pdf", auth, ADMIN_MANAGER, reportActivity.downloadActivityPDFController);

router.get("/reports/activity/excel", auth, ADMIN_MANAGER, reportActivity.downloadActivityExcelController);

module.exports = router;