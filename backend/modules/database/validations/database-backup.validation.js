// modules/database/validations/database-backup.validation.js

const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| Database Backup Validation
|--------------------------------------------------------------------------
*/

const databaseBackupValidation =
    z.object({

        name: z

            .string()

            .trim()

            .min(
                3,
                "Backup name too short"
            )

            .max(
                100,
                "Backup name too long"
            )

            .optional(),

        description: z

            .string()

            .trim()

            .max(
                500,
                "Description too long"
            )

            .optional(),
    });

module.exports =
    databaseBackupValidation;