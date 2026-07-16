// modules/database/services/database-query.service.js

const prisma = require(
  "../../../config/prisma.config",
);

const safeQuery = require(
  "../utils/safe-query",
);

const databaseQueryValidation = require(
  "../validations/database-query.validation",
);

class DatabaseQueryService {

  /*
    |--------------------------------------------------------------------------
    | Execute Safe Query
    |--------------------------------------------------------------------------
    */

  async executeQuery(query) {

    const validated =
            databaseQueryValidation.parse({
              query,
            });

    const isSafe =
            safeQuery(
              validated.query,
            );

    if (!isSafe) {

      throw new Error(
        "Dangerous query detected",
      );
    }

    const result =
            await prisma
              .$queryRawUnsafe(
                validated.query,
              );

    return {

      success: true,

      rows:
                Array.isArray(result)
                  ? result.length
                  : 0,

      data: result,

      executedAt:
                new Date(),
    };
  }
}

module.exports =
    new DatabaseQueryService();
