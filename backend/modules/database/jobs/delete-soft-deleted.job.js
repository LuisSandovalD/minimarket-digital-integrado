// modules/database/jobs/delete-soft-deleted.job.js

const cron = require("node-cron");

const prisma = require(
    "../../../config/prisma.config"
);

/*
|--------------------------------------------------------------------------
| Delete Soft Deleted Records
|--------------------------------------------------------------------------
|
| Limpia registros soft deleted.
|
*/

function startDeleteSoftDeletedJob() {

    cron.schedule(

        "0 4 * * *",

        async () => {

            try {

                console.log(
                    "🗑 Removing soft deleted records..."
                );

                /*
                |--------------------------------------------------------------------------
                | Example Cleanup
                |--------------------------------------------------------------------------
                |
                | Ajustar según tus modelos.
                |
                */

                /*
                await prisma.user.deleteMany({
                    where: {
                        deletedAt: {
                            not: null,
                        },
                    },
                });
                */

                console.log(
                    "✅ Soft delete cleanup completed"
                );

            } catch (error) {

                console.error(
                    "❌ Soft delete cleanup error:",
                    error.message
                );
            }
        }
    );

    console.log(
        "✅ Soft delete cleanup job started"
    );
}

module.exports = {

    startDeleteSoftDeletedJob,
};