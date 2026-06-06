// modules/database/routes/database.routes.js

const express = require(
    "express"
);

const router =
    express.Router();

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
*/

const databaseHealthController = require(
    "../controllers/database-health.controller"
);

const databaseMetricsController = require(
    "../controllers/database-metrics.controller"
);

const databaseBackupController = require(
    "../controllers/database-backup.controller"
);

const databaseQueryController = require(
    "../controllers/database-query.controller"
);

const databaseBranchController = require(
    "../controllers/database-branch.controller"
);

const databaseMonitoringController = require(
    "../controllers/database-monitoring.controller"
);

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/
const auth =
    require("../../../middleware/auth");
/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

router.get(

    "/health",
    auth,
    databaseHealthController.getHealth
);

/*
|--------------------------------------------------------------------------
| Metrics
|--------------------------------------------------------------------------
*/

router.get(

    "/metrics",
    auth,
    databaseMetricsController.getMetrics
);

/*
|--------------------------------------------------------------------------
| Monitoring
|--------------------------------------------------------------------------
*/

router.get(

    "/monitoring",
    auth,
    databaseMonitoringController
        .getMonitoring
);

/*
|--------------------------------------------------------------------------
| Execute Query
|--------------------------------------------------------------------------
*/

router.post(

    "/query",
    auth,
    databaseQueryController.executeQuery
);

/*
|--------------------------------------------------------------------------
| Backups
|--------------------------------------------------------------------------
*/

router.get(

    "/backups",
    auth,

    databaseBackupController.getBackups
);

router.post(

    "/backups",
    auth,

    databaseBackupController.createBackup
);

router.post(

    "/backups/restore",
    auth,

    databaseBackupController.restoreBackup
);

/*
|--------------------------------------------------------------------------
| Neon Branches
|--------------------------------------------------------------------------
*/

router.get(

    "/branches",
    auth,

    databaseBranchController.getBranches
);

router.post(

    "/branches",
    auth,

    databaseBranchController.createBranch
);

module.exports =
    router;