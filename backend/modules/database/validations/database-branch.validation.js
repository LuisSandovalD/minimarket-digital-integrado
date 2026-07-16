// modules/database/validations/database-branch.validation.js

const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| Database Branch Validation
|--------------------------------------------------------------------------
*/

const databaseBranchValidation =
    z.object({

      branchId: z

        .string()

        .trim()

        .min(
          1,
          "Branch ID is required",
        )

        .max(
          100,
          "Branch ID too long",
        )

        .optional(),

      branchName: z

        .string()

        .trim()

        .min(
          2,
          "Branch name too short",
        )

        .max(
          100,
          "Branch name too long",
        )

        .optional(),
    });

module.exports =
    databaseBranchValidation;
