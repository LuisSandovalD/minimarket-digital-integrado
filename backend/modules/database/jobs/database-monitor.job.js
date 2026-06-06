// modules/database/jobs/database-monitor.job.js

const cron = require("node-cron");

const databaseMonitoringService = require(
    "../services/database-monitoring.service"
);

/*
|--------------------------------------------------------------------------
| Database Monitoring Job
|--------------------------------------------------------------------------
|
| Monitoreo automático.
|
*/

function startDatabaseMonitorJob() {

    cron.schedule(

        "*/5 * * * *",

        async () => {

            try {

                const monitoring =
                    await databaseMonitoringService
                        .getMonitoring();

                console.log(
                    "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                );

                console.log(
                    "📊 Database Monitoring"
                );

                console.log(
                    "Connections:",
                    monitoring
                        .activeConnections
                        ?.length || 0
                );

                console.log(
                    "Memory:",
                    monitoring.memoryUsage
                );

                console.log(
                    "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                );

            } catch (error) {

                console.error(
                    "❌ Monitor job error:",
                    error.message
                );
            }
        }
    );

    console.log(
        "✅ Database monitor job started"
    );
}

module.exports = {

    startDatabaseMonitorJob,
};