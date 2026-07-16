// modules/database/includes/database.include.js

/*
|--------------------------------------------------------------------------
| Database Includes
|--------------------------------------------------------------------------
|
| Exporta helpers generales database.
|
*/

const databaseRepository = require(
  "../repositories/database.repository",
);

const databaseHealthService = require(
  "../services/database-health.service",
);

const databaseMetricsService = require(
  "../services/database-metrics.service",
);

const databaseMonitoringService = require(
  "../services/database-monitoring.service",
);

const databaseConnectionsService = require(
  "../services/database-connections.service",
);

const databaseStorageService = require(
  "../services/database-storage.service",
);

module.exports = {

  databaseRepository,

  databaseHealthService,

  databaseMetricsService,

  databaseMonitoringService,

  databaseConnectionsService,

  databaseStorageService,
};
