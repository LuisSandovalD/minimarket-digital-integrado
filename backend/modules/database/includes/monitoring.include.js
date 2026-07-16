// modules/database/includes/monitoring.include.js

/*
|--------------------------------------------------------------------------
| Monitoring Includes
|--------------------------------------------------------------------------
|
| Exporta herramientas monitoring.
|
*/

const monitoringRepository = require(
  "../repositories/monitoring.repository",
);

const databaseMonitoringService = require(
  "../services/database-monitoring.service",
);

const databaseHealthService = require(
  "../services/database-health.service",
);

const {
  prismaMonitoring,
} = require(
  "../prisma/prisma-monitor",
);

const {
  prismaHealthCheck,
} = require(
  "../prisma/prisma-health",
);

module.exports = {

  monitoringRepository,

  databaseMonitoringService,

  databaseHealthService,

  prismaMonitoring,

  prismaHealthCheck,
};
