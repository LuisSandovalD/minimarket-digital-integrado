// modules/database/services/database-connections.service.js

const databaseRepository = require(
    "../repositories/database.repository"
);

class DatabaseConnectionsService {

    /*
    |--------------------------------------------------------------------------
    | Get Active Connections
    |--------------------------------------------------------------------------
    */

    async getConnections() {

        const connections =
            await databaseRepository
                .getConnections();

        return {

            success: true,

            activeConnections:
                connections[0]?.total || 0,

            timestamp:
                new Date(),
        };
    }
}

module.exports =
    new DatabaseConnectionsService();