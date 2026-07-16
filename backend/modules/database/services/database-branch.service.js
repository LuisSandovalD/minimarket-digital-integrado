// modules/database/services/database-branch.service.js

const {
  getBranches,
  createBranch,
} = require(
  "../neon/neon-branches",
);

class DatabaseBranchService {

  /*
    |--------------------------------------------------------------------------
    | Get Neon Branches
    |--------------------------------------------------------------------------
    */

  async getBranches() {

    const branches =
            await getBranches();

    return {

      success: true,

      provider: "Neon",

      branches,

      timestamp:
                new Date(),
    };
  }

  /*
    |--------------------------------------------------------------------------
    | Create Neon Branch
    |--------------------------------------------------------------------------
    */

  async createBranch(
    branchName,
  ) {

    const branch =
            await createBranch(
              branchName,
            );

    return {

      success: true,

      branch,

      timestamp:
                new Date(),
    };
  }
}

module.exports =
    new DatabaseBranchService();
