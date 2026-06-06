// modules/database/neon/neon-api.js

const axios = require("axios");

const databaseConfig = require(
    "../../../config/database.config"
);

const {
    buildNeonHeaders,
    buildNeonUrl,
} = require(
    "../utils/neon-utils"
);

/*
|--------------------------------------------------------------------------
| Neon API Client
|--------------------------------------------------------------------------
*/

const neonApi = axios.create({

    baseURL:
        "https://console.neon.tech/api/v2",

    headers:
        buildNeonHeaders(
            databaseConfig.neon.apiKey
        ),

    timeout: 10000,
});

/*
|--------------------------------------------------------------------------
| Get Neon Project
|--------------------------------------------------------------------------
*/

async function getProject() {

    const url =
        buildNeonUrl(
            databaseConfig.neon.projectId
        );

    const response =
        await neonApi.get(url);

    return response.data;
}

module.exports = {

    neonApi,

    getProject,
};