// modules/database/prisma/prisma-transactions.js

const prisma = require(
    "../../../config/prisma.config"
);

/*
|--------------------------------------------------------------------------
| Run Database Transaction
|--------------------------------------------------------------------------
*/

async function runTransaction(
    operations = []
) {

    try {

        const result =
            await prisma.$transaction(
                operations
            );

        return {

            success: true,

            result,

            timestamp:
                new Date(),
        };

    } catch (error) {

        return {

            success: false,

            error:
                error.message,

            timestamp:
                new Date(),
        };
    }
}

/*
|--------------------------------------------------------------------------
| Interactive Transaction
|--------------------------------------------------------------------------
*/

async function interactiveTransaction(
    callback
) {

    return prisma.$transaction(
        async (tx) => {

            return callback(tx);
        }
    );
}

module.exports = {

    runTransaction,

    interactiveTransaction,
};