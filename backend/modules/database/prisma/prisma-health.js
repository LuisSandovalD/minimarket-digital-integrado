// modules/database/prisma/prisma-health.js

const prisma = require(
    "../../../config/prisma.config"
);

/*
|--------------------------------------------------------------------------
| Prisma Health Check
|--------------------------------------------------------------------------
*/

async function prismaHealthCheck() {

    try {

        await prisma.$queryRaw`
            SELECT 1;
        `;

        return {

            success: true,

            status: "healthy",

            provider: "Prisma",

            timestamp:
                new Date(),
        };

    } catch (error) {

        return {

            success: false,

            status: "unhealthy",

            error:
                error.message,

            timestamp:
                new Date(),
        };
    }
}

module.exports = {

    prismaHealthCheck,
};