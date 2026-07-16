// modules/database/controllers/database-metrics.controller.js

const databaseMetricsService = require(
  "../services/database-metrics.service",
);

const databaseResponse = require(
  "../utils/database-response",
);

class DatabaseMetricsController {

  /*
    |--------------------------------------------------------------------------
    | Get Metrics
    |--------------------------------------------------------------------------
    */

  async getMetrics(req, res) {

    try {

      const data =
                await databaseMetricsService
                  .getMetrics();

      return res.status(200).json(

        databaseResponse({

          success: true,

          message:
                        "Database metrics retrieved successfully",

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
                        "DATABASE_METRICS_ERROR",
        }),
      );
    }
  }
}

module.exports =
    new DatabaseMetricsController();
