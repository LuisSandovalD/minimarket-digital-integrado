// modules/database/neon/neon-metrics.js

const {
    neonApi,
} = require("./neon-api");

const databaseConfig = require(
    "../../../config/database.config"
);

/*
|--------------------------------------------------------------------------
| Get Project Metrics
|--------------------------------------------------------------------------
*/

async function getProjectMetrics() {

    const response =
        await neonApi.get(

            `/projects/${databaseConfig.neon.projectId}`
        );

    return response.data;
}

module.exports = {

    getProjectMetrics,
};