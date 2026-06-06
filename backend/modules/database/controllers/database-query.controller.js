// modules/database/controllers/database-query.controller.js

const databaseQueryService = require(
    "../services/database-query.service"
);

const databaseResponse = require(
    "../utils/database-response"
);

class DatabaseQueryController {

    /*
    |--------------------------------------------------------------------------
    | Execute Query
    |--------------------------------------------------------------------------
    */

    async executeQuery(req, res) {

        try {

            const { query } =
                req.body;

            const data =
                await databaseQueryService
                    .executeQuery(
                        query
                    );

            return res.status(200).json(

                databaseResponse({

                    success: true,

                    message:
                        "Query executed successfully",

                    data,
                })
            );

        } catch (error) {

            return res.status(400).json(

                databaseResponse({

                    success: false,

                    message:
                        error.message,

                    error:
                        "DATABASE_QUERY_ERROR",
                })
            );
        }
    }
}

module.exports =
    new DatabaseQueryController();