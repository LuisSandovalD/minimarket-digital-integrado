// modules/database/jobs/database-cleanup.job.js

const cron = require("node-cron");

const databaseCleanupService = require(
  "../services/database-cleanup.service",
);

/*
|--------------------------------------------------------------------------
| Database Cleanup Job
|--------------------------------------------------------------------------
|
| Limpieza automática.
|
*/

function startDatabaseCleanupJob() {

  cron.schedule(

    "0 3 * * *",

    async () => {

      try {

        console.log(
          "🧹 Running database cleanup...",
        );

        await databaseCleanupService
          .cleanup();

        console.log(
          "✅ Cleanup completed",
        );

      } catch (error) {

        console.error(
          "❌ Cleanup job error:",
          error.message,
        );
      }
    },
  );

  console.log(
    "✅ Database cleanup job started",
  );
}

module.exports = {

  startDatabaseCleanupJob,
};
