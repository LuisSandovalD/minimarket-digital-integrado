// modules/database/services/database-latency.service.js

const prisma = require(
    "../../../config/prisma.config"
);

class DatabaseLatencyService {

    /*
    |--------------------------------------------------------------------------
    | Get Database Latency
    |--------------------------------------------------------------------------
    */

    async getLatency() {

        const start =
            Date.now();

        await prisma.$queryRaw`
            SELECT NOW();
        `;

        const latency =
            Date.now() - start;

        return {

            success: true,

            latency:
                `${latency}ms`,

            timestamp:
                new Date(),
        };
    }
}

module.exports =
    new DatabaseLatencyService();