// modules/database/jobs/database-backup.job.js

const cron = require("node-cron");

const databaseBackupService = require(
    "../services/database-backup.service"
);

const databaseConfig = require(
    "../../../config/database.config"
);

/*
|--------------------------------------------------------------------------
| Database Backup Job
|--------------------------------------------------------------------------
|
| Ejecuta backups automáticos.
|
*/

function startDatabaseBackupJob() {

    if (
        !databaseConfig.backup.enabled
    ) {

        console.log(
            "⚠ Database backup job disabled"
        );

        return;
    }

    cron.schedule(

        databaseConfig.backup.schedule,

        async () => {

            try {

                console.log(
                    "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                );

                console.log(
                    "🛢 Running database backup..."
                );

                await databaseBackupService
                    .createBackup();

                console.log(
                    "✅ Backup completed"
                );

                console.log(
                    "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                );

            } catch (error) {

                console.error(
                    "❌ Backup job error:",
                    error.message
                );
            }
        }
    );

    console.log(
        "✅ Database backup job started"
    );
}

module.exports = {

    startDatabaseBackupJob,
};