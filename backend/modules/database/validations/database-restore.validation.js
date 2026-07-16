// modules/database/validations/database-restore.validation.js

const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| Database Restore Validation
|--------------------------------------------------------------------------
*/

const databaseRestoreValidation =
    z.object({

      file: z

        .string({
          required_error:
                    "Backup file is required",
        })

        .trim()

        .min(
          1,
          "Backup file cannot be empty",
        )

        .max(
          255,
          "Invalid backup file name",
        )

        .regex(
          /^[a-zA-Z0-9_\-.]+$/,
          "Invalid file format",
        ),
    });

module.exports =
    databaseRestoreValidation;
