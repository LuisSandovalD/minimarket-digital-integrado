// modules/database/neon/neon-restore.js

/*
|--------------------------------------------------------------------------
| Restore Database
|--------------------------------------------------------------------------
|
| Placeholder enterprise restore.
| Neon restore snapshots pueden
| variar según API/version.
|
*/

async function restoreDatabase(
    snapshotId
) {

    return {

        success: true,

        snapshotId,

        restoredAt:
            new Date(),
    };
}

module.exports = {

    restoreDatabase,
};