// modules/database/includes/metrics.include.js

/*
|--------------------------------------------------------------------------
| Metrics Includes
|--------------------------------------------------------------------------
|
| Exporta herramientas métricas.
|
*/

const metricsRepository = require(
    "../repositories/metrics.repository"
);

const databaseMetricsService = require(
    "../services/database-metrics.service"
);

const databaseLatencyService = require(
    "../services/database-latency.service"
);

const databaseConnectionsService = require(
    "../services/database-connections.service"
);

const databaseStorageService = require(
    "../services/database-storage.service"
);

module.exports = {

    metricsRepository,

    databaseMetricsService,

    databaseLatencyService,

    databaseConnectionsService,

    databaseStorageService,
};