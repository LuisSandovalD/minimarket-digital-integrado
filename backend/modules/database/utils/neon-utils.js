// modules/database/utils/neon-utils.js

/*
|--------------------------------------------------------------------------
| Neon API Headers
|--------------------------------------------------------------------------
|
| Genera headers para API Neon.
|
*/

function buildNeonHeaders(
  apiKey,
) {

  return {

    Authorization:
            `Bearer ${apiKey}`,

    "Content-Type":
            "application/json",
  };
}

/*
|--------------------------------------------------------------------------
| Build Neon URL
|--------------------------------------------------------------------------
*/

function buildNeonUrl(
  projectId,
  endpoint = "",
) {

  return `https://console.neon.tech/api/v2/projects/${projectId}${endpoint}`;
}

module.exports = {

  buildNeonHeaders,

  buildNeonUrl,
};
