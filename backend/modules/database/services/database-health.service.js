// modules/database/services/database-health.service.js

const databaseRepository = require(
    "../repositories/database.repository"
);

const calculateLatency = require(
    "../utils/calculate-latency"
);

const databaseStatus = require(
    "../utils/database-status"
);

class DatabaseHealthService {

    /*
    |--------------------------------------------------------------------------
    | Get Database Health
    |--------------------------------------------------------------------------
    */

    async getHealth() {

        const latency =
            await calculateLatency(
                async () => {

                    await databaseRepository
                        .checkConnection();
                }
            );

        const version =
            await databaseRepository
                .getDatabaseVersion();

        const status =
            databaseStatus(latency);

        return {

            success: true,

            database: "PostgreSQL",

            provider: "Neon",

            latency:
                `${latency}ms`,

            status:
                status.status,

            color:
                status.color,

            version:
                version[0]?.version || null,

            timestamp:
                new Date(),
        };
    }
}

module.exports =
    new DatabaseHealthService();