// modules/database/utils/database-response.js

/*
|--------------------------------------------------------------------------
| Standard Database Response
|--------------------------------------------------------------------------
|
| Estandariza respuestas API.
|
*/

function databaseResponse({

  success = true,

  message = "Success",

  data = null,

  error = null,

  meta = {},

}) {

  return {

    success,

    message,

    data,

    error,

    meta,

    timestamp:
            new Date(),
  };
}

module.exports =
    databaseResponse;
