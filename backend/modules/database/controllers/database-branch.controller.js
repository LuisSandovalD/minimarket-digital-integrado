// modules/database/controllers/database-branch.controller.js

const databaseBranchService = require(
  "../services/database-branch.service",
);

const databaseResponse = require(
  "../utils/database-response",
);

class DatabaseBranchController {

  /*
    |--------------------------------------------------------------------------
    | Get Branches
    |--------------------------------------------------------------------------
    */

  async getBranches(req, res) {

    try {

      const data =
                await databaseBranchService
                  .getBranches();

      return res.status(200).json(

        databaseResponse({

          success: true,

          message:
                        "Branches retrieved successfully",

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
                        "BRANCH_FETCH_ERROR",
        }),
      );
    }
  }

  /*
    |--------------------------------------------------------------------------
    | Create Branch
    |--------------------------------------------------------------------------
    */

  async createBranch(req, res) {

    try {

      const {
        branchName,
      } = req.body;

      const data =
                await databaseBranchService
                  .createBranch(
                    branchName,
                  );

      return res.status(201).json(

        databaseResponse({

          success: true,

          message:
                        "Branch created successfully",

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
                        "BRANCH_CREATE_ERROR",
        }),
      );
    }
  }
}

module.exports =
    new DatabaseBranchController();
