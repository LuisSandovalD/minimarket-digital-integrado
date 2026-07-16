// modules/database/utils/database-status.js

/*
|--------------------------------------------------------------------------
| Database Status By Latency
|--------------------------------------------------------------------------
|
| Clasifica estado de DB
| según latencia.
|
*/

function databaseStatus(latency) {

  if (latency < 100) {

    return {

      status: "excellent",

      color: "green",
    };
  }

  if (latency < 300) {

    return {

      status: "good",

      color: "blue",
    };
  }

  if (latency < 1000) {

    return {

      status: "slow",

      color: "yellow",
    };
  }

  return {

    status: "critical",

    color: "red",
  };
}

module.exports =
    databaseStatus;
