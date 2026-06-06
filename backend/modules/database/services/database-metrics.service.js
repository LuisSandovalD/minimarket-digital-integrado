// modules/database/services/database-metrics.service.js

const databaseRepository = require(
    "../repositories/database.repository"
);

const metricsRepository = require(
    "../repositories/metrics.repository"
);

class DatabaseMetricsService {

    /*
    |--------------------------------------------------------------------------
    | Get Database Metrics
    |--------------------------------------------------------------------------
    */

    async getMetrics() {

        const size =
            await databaseRepository
                .getDatabaseSize();

        const connections =
            await databaseRepository
                .getConnections();

        const tables =
            await metricsRepository
                .getTablesCount();

        const indexes =
            await metricsRepository
                .getIndexesCount();

        const stats =
            await metricsRepository
                .getDatabaseStats();

        return {

            success: true,

            databaseSize:
                size[0]?.size || "0 MB",

            databaseBytes:
                size[0]?.bytes || 0,

            activeConnections:
                connections[0]?.total || 0,

            tables:
                tables?.total || 0,

            indexes:
                indexes?.total || 0,

            stats:
                stats[0] || {},

            environment:
                process.env.NODE_ENV ||
                "development",

            timestamp:
                new Date(),
        };
    }
}

module.exports =
    new DatabaseMetricsService();