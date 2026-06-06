// modules/database/prisma/prisma-queries.js

const prisma = require(
    "../../../config/prisma.config"
);

const safeQuery = require(
    "../utils/safe-query"
);

/*
|--------------------------------------------------------------------------
| Execute Safe Query
|--------------------------------------------------------------------------
*/

async function executeSafeQuery(
    query
) {

    const isSafe =
        safeQuery(query);

    if (!isSafe) {

        throw new Error(
            "Dangerous query detected"
        );
    }

    return prisma.$queryRawUnsafe(
        query
    );
}

/*
|--------------------------------------------------------------------------
| Execute Transaction Query
|--------------------------------------------------------------------------
*/

async function executeTransaction(
    callback
) {

    return prisma.$transaction(
        callback
    );
}

module.exports = {

    executeSafeQuery,

    executeTransaction,
};