// modules/database/neon/neon-status.js

const {
  neonApi,
} = require("./neon-api");

const databaseConfig = require(
  "../../../config/database.config",
);

/*
|--------------------------------------------------------------------------
| Get Neon Status
|--------------------------------------------------------------------------
*/

async function getNeonStatus() {

  const response =
        await neonApi.get(

          `/projects/${databaseConfig.neon.projectId}`,
        );

  return {

    success: true,

    project:
            response.data.project || null,

    timestamp:
            new Date(),
  };
}

module.exports = {

  getNeonStatus,
};
