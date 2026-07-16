// modules/database/neon/neon-branches.js

const {
  neonApi,
} = require("./neon-api");

const databaseConfig = require(
  "../../../config/database.config",
);

/*
|--------------------------------------------------------------------------
| Get Neon Branches
|--------------------------------------------------------------------------
*/

async function getBranches() {

  const response =
        await neonApi.get(

          `/projects/${databaseConfig.neon.projectId}/branches`,
        );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| Create Branch
|--------------------------------------------------------------------------
*/

async function createBranch(
  branchName,
) {

  const response =
        await neonApi.post(

          `/projects/${databaseConfig.neon.projectId}/branches`,

          {
            branch: {
              name: branchName,
            },
          },
        );

  return response.data;
}

module.exports = {

  getBranches,

  createBranch,
};
