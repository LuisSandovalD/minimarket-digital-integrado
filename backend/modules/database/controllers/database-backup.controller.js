// modules/database/controllers/database-backup.controller.js

const databaseBackupService = require(
    "../services/database-backup.service"
);

const databaseResponse = require(
    "../utils/database-response"
);

class DatabaseBackupController {

    /*
    |--------------------------------------------------------------------------
    | Create Backup
    |--------------------------------------------------------------------------
    */

    async createBackup(req, res) {

        try {

            const data =
                await databaseBackupService
                    .createBackup(
                        req.body
                    );

            return res.status(201).json(

                databaseResponse({

                    success: true,

                    message:
                        "Backup created successfully",

                    data,
                })
            );

        } catch (error) {

            return res.status(500).json(

                databaseResponse({

                    success: false,

                    message:
                        error.message,

                    error:
                        "BACKUP_CREATE_ERROR",
                })
            );
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Restore Backup
    |--------------------------------------------------------------------------
    */

    async restoreBackup(req, res) {

        try {

            const data =
                await databaseBackupService
                    .restoreBackup(
                        req.body
                    );

            return res.status(200).json(

                databaseResponse({

                    success: true,

                    message:
                        "Backup restored successfully",

                    data,
                })
            );

        } catch (error) {

            return res.status(500).json(

                databaseResponse({

                    success: false,

                    message:
                        error.message,

                    error:
                        "BACKUP_RESTORE_ERROR",
                })
            );
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Get Backups
    |--------------------------------------------------------------------------
    */

    async getBackups(req, res) {

        try {

            const data =
                await databaseBackupService
                    .getBackups();

            return res.status(200).json(

                databaseResponse({

                    success: true,

                    message:
                        "Backups retrieved successfully",

                    data,
                })
            );

        } catch (error) {

            return res.status(500).json(

                databaseResponse({

                    success: false,

                    message:
                        error.message,

                    error:
                        "BACKUP_FETCH_ERROR",
                })
            );
        }
    }
}

module.exports =
    new DatabaseBackupController();