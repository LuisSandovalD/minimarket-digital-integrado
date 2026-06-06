// modules/database/services/database-monitoring.service.js

const monitoringRepository = require(
    "../repositories/monitoring.repository"
);

class DatabaseMonitoringService {

    /*
    |--------------------------------------------------------------------------
    | Get Monitoring Data
    |--------------------------------------------------------------------------
    */

    async getMonitoring() {

        const connections =
            await monitoringRepository
                .getActiveConnections();

        const locks =
            await monitoringRepository
                .getLocks();

        const slowQueries =
            await monitoringRepository
                .getSlowQueries();

        return {

            success: true,

            uptime:
                process.uptime(),

            memoryUsage:
                process.memoryUsage(),

            cpuUsage:
                process.cpuUsage(),

            activeConnections:
                connections,

            locks,

            slowQueries,

            nodeVersion:
                process.version,

            timestamp:
                new Date(),
        };
    }
}

module.exports =
    new DatabaseMonitoringService();