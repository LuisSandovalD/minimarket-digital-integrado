// modules/database/services/database-storage.service.js

const databaseRepository = require(
    "../repositories/database.repository"
);

class DatabaseStorageService {

    /*
    |--------------------------------------------------------------------------
    | Get Database Storage
    |--------------------------------------------------------------------------
    */

    async getStorage() {

        const size =
            await databaseRepository
                .getDatabaseSize();

        return {

            success: true,

            databaseSize:
                size[0]?.size || "0 MB",

            databaseBytes:
                size[0]?.bytes || 0,

            timestamp:
                new Date(),
        };
    }
}

module.exports =
    new DatabaseStorageService();