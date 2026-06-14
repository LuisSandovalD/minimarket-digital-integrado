const express =
    require("express");

const router =
    express.Router();

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
*/

const dashboardController =
    require(
        "../controllers/dashboard.controller"
    );

const kpiController =
    require(
        "../controllers/kpi.controller"
    );
const reportActivity = require('../controllers/report-activity.controller')

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

const auth =
    require(
        "../../../middleware/auth"
    );

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(

    "/",
    auth,

    dashboardController
        .getDashboard
);

/*
|--------------------------------------------------------------------------
| KPIs
|--------------------------------------------------------------------------
*/

router.get(

    "/kpis",
    auth,

    kpiController
        .getKPIs
);

// REPORTS - ACTIVITY / AUDIT
router.get('/reports/activity/pdf', auth, reportActivity.downloadActivityPDFController)
router.get('/reports/activity/excel', auth, reportActivity.downloadActivityExcelController)

module.exports =
    router;