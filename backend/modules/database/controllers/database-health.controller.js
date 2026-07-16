// modules/database/controllers/database-health.controller.js

const databaseHealthService = require(
  "../services/database-health.service",
);

const databaseResponse = require(
  "../utils/database-response",
);

class DatabaseHealthController {

  /*
    |--------------------------------------------------------------------------
    | Get Database Health
    |--------------------------------------------------------------------------
    */

  async getHealth(req, res) {

    try {

      const data =
                await databaseHealthService
                  .getHealth();

      return res.status(200).json(

        databaseResponse({

          success: true,

          message:
                        "Database health retrieved successfully",

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
                        "DATABASE_HEALTH_ERROR",
        }),
      );
    }
  }
}

module.exports =
    new DatabaseHealthController();
