// modules/database/controllers/database-monitoring.controller.js

const databaseMonitoringService = require(
  "../services/database-monitoring.service",
);

const databaseResponse = require(
  "../utils/database-response",
);

class DatabaseMonitoringController {

  /*
    |--------------------------------------------------------------------------
    | Get Monitoring
    |--------------------------------------------------------------------------
    */

  async getMonitoring(req, res) {

    try {

      const data =
                await databaseMonitoringService
                  .getMonitoring();

      return res.status(200).json(

        databaseResponse({

          success: true,

          message:
                        "Database monitoring retrieved successfully",

          data,
        }),
      );

    } catch (error) {

      return res.status(500).json(

        databaseResponse({

          success: false,

          message:
                        error.message,

          error:
                        "DATABASE_MONITORING_ERROR",
        }),
      );
    }
  }
}

module.exports =
    new DatabaseMonitoringController();
